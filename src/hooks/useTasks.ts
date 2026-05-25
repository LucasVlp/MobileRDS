import { useState, useEffect, useCallback } from 'react';
import { API_URL, MESSAGES } from '../utils/constants';
import type { Task, TaskFormData, UseTasksReturn } from '../types';
 
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  defaultError?: string;
}
 
async function apiRequest<T = void>(
  endpoint: string,
  { method = 'GET', body, defaultError = MESSAGES.ERROR_CONNECTION }: RequestOptions = {}
): Promise<T> {
  const response = await fetch(endpoint, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
 
  if (!response.ok) {

    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error ?? defaultError);
  }
 
  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
}
 
 
function validateTitle(title: string, setError: (msg: string) => void): boolean {
  if (!title.trim()) {
    setError(MESSAGES.ERROR_EMPTY_TITLE);
    return false;
  }
  return true;
}
 
 
export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
 
  const withSubmit = useCallback(
    async (fn: () => Promise<boolean>): Promise<boolean> => {
      setSubmitting(true);
      setError(null);
      try {
        return await fn();
      } catch (err) {
        const message = err instanceof Error ? err.message : MESSAGES.ERROR_CONNECTION;
        setError(message);
        console.error('Erro:', err);
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    []
  );
 
  const fetchTasks = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRequest<Task[]>(API_URL, { defaultError: MESSAGES.ERROR_LOAD });
      setTasks(data);
    } catch (err) {
      setError(MESSAGES.ERROR_LOAD);
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  }, []);
 
  const createTask = useCallback(
    (taskData: TaskFormData): Promise<boolean> => {
      if (!validateTitle(taskData.title, setError)) return Promise.resolve(false);
 
      return withSubmit(async () => {

        const newTask = await apiRequest<Task>(API_URL, {
          method: 'POST',
          body: { ...taskData, completed: false },
          defaultError: MESSAGES.ERROR_CREATE,
        });
 
        setTasks(prev => [...prev, newTask]);
        return true;
      });
    },
    [withSubmit]
  );
 
  const updateTask = useCallback(
    (id: number, taskData: TaskFormData): Promise<boolean> => {
      if (!validateTitle(taskData.title, setError)) return Promise.resolve(false);
 
      return withSubmit(async () => {
        const updatedTask = await apiRequest<Task>(`${API_URL}/${id}`, {
          method: 'PUT',
          body: taskData,
          defaultError: MESSAGES.ERROR_UPDATE,
        });
 
        setTasks(prev => prev.map(t => (t.id === id ? updatedTask : t)));
        return true;
      });
    },
    [withSubmit]
  );
 
  const toggleTask = useCallback(
    async (id: number): Promise<void> => {
      try {
        await apiRequest(`${API_URL}/${id}/toggle`, {
          method: 'PATCH',
          defaultError: MESSAGES.ERROR_UPDATE,
        });
 
        setTasks(prev =>
          prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
        );
      } catch (err) {
        setError(MESSAGES.ERROR_UPDATE);
        console.error('Erro:', err);
      }
    },
    []
  );
 
  const deleteTask = useCallback(
    async (id: number): Promise<void> => {
      try {
        await apiRequest(`${API_URL}/${id}`, {
          method: 'DELETE',
          defaultError: MESSAGES.ERROR_DELETE,
        });
 
        setTasks(prev => prev.filter(t => t.id !== id));
      } catch (err) {
        setError(MESSAGES.ERROR_DELETE);
        console.error('Erro:', err);
      }
    },
    []
  );
 
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);
 
  return {
    tasks,
    loading,
    error,
    submitting,
    createTask,
    updateTask,
    toggleTask,
    deleteTask,
    fetchTasks,
  };
}