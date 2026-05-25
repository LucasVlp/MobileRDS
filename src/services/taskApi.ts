import { API_URL } from '../utils/constants';
import type { Task, TaskFormData } from '../types';

async function extractErrorMessage(response: Response, fallback: string): Promise<string> {
  try {
    const data = await response.json();
    return data.error || fallback;
  } catch {
    return fallback;
  }
}

export async function fetchAllTasks(signal?: AbortSignal): Promise<Task[]> {
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error('Erro ao carregar tarefas');
  return response.json();
}

export async function createTaskRequest(taskData: TaskFormData): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...taskData, completed: false }),
  });
  if (!response.ok) {
    const message = await extractErrorMessage(response, 'Erro ao criar tarefa');
    throw new Error(message);
  }
  return response.json();
}

export async function updateTaskRequest(id: number, taskData: TaskFormData): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    const message = await extractErrorMessage(response, 'Erro ao atualizar tarefa');
    throw new Error(message);
  }
  return response.json();
}

export async function toggleTaskRequest(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}/toggle`, { method: 'PATCH' });
  if (!response.ok) throw new Error('Erro ao alternar tarefa');
  return response.json();
}

export async function deleteTaskRequest(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Erro ao remover tarefa');
}
