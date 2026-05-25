/**
 * Constantes da aplicação
 * Centraliza URLs, mensagens e configurações
 */

import type { Messages } from '../types';

// URL base da API (configurada em app.json)
const apiUrl = 'http://10.0.2.2:8080';
export const API_URL = `${apiUrl}/api/tasks`;

// Mensagens do sistema
export const MESSAGES: Messages = {
  LOADING: "Carregando tarefas...",
  EMPTY_TITLE: "Nenhuma tarefa encontrada",
  EMPTY_DESCRIPTION: "Adicione sua primeira tarefa acima para começar!",
  ERROR_LOAD: "Erro ao carregar tarefas. Verifique se o servidor está rodando.",
  ERROR_CREATE: "Erro ao adicionar tarefa. Tente novamente.",
  ERROR_UPDATE: "Erro ao atualizar tarefa. Tente novamente.",
  ERROR_DELETE: "Erro ao remover tarefa. Tente novamente.",
  ERROR_EMPTY_TITLE: "O título da tarefa é obrigatório.",
  ERROR_CONNECTION: "Não foi possível conectar ao servidor. Verifique sua conexão."
};
