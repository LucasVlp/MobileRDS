/**
 * Componente de formulário de tarefas
 * Permite criar novas tarefas com título e descrição
 */

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import type { TaskFormProps } from '../types';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';

function TaskForm({ 
  form, 
  onSubmit, 
  onChange, 
  submitting = false,
  editingTaskId = null,
  onCancelEdit
}: Readonly<TaskFormProps>) {
  return (
    // Container principal do formulário com sombra
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingTaskId === null ? 'Adicionar Nova Tarefa' : 'Editar Tarefa'}
      </Text>
      
      {/* Campo de título (obrigatório) */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título da tarefa..."
          value={form.title}
          onChangeText={(text) => onChange('title', text)} // Atualiza estado
          editable={!submitting} // Desabilita durante envio
        />
      </View>
      
      {/* Campo de descrição (opcional) */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Adicione uma descrição (opcional)..."
          value={form.description}
          onChangeText={(text) => onChange('description', text)}
          multiline // Permite múltiplas linhas
          numberOfLines={3} // Altura inicial
          editable={!submitting} // Desabilita durante envio
        />
      </View>
      
      {/* Botões de ação */}
      {editingTaskId === null ? (
        // Modo criação - mostra apenas botão Adicionar
        <TouchableOpacity
          style={[styles.button, (submitting || !form.title.trim()) && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={submitting || !form.title.trim()}
        >
          <Text style={styles.buttonText}>
            {submitting ? "Adicionando..." : "Adicionar Tarefa"}
          </Text>
        </TouchableOpacity>
      ) : (
        // Modo edição - mostra botões Salvar e Cancelar lado a lado
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onCancelEdit}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.saveButton, (submitting || !form.title.trim()) && styles.buttonDisabled]}
            onPress={onSubmit}
            disabled={submitting || !form.title.trim()}
          >
            <Text style={styles.buttonText}>
              {submitting ? "Salvando..." : "Salvar Alterações"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  // Card branco com sombra
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginBottom: spacing.lg,
    color: colors.text,
  },
  formGroup: {
    marginBottom: spacing.lg,
  },
  // Label dos campos
  label: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
    marginBottom: spacing.sm,
    color: colors.gray700,
  },
  // Campo de entrada padrão
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.sizes.md,
    color: colors.text,
  },
  // Estilo adicional para área de texto
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top', // Alinha texto no topo
  },
  // Botão principal azul
  button: {
    backgroundColor: colors.primary,
    padding: spacing.sm + spacing.xs,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  // Botão desabilitado (mais claro)
  buttonDisabled: {
    backgroundColor: colors.primaryLight,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
  // Container para botões lado a lado
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  // Botão de cancelar (cinza)
  cancelButton: {
    flex: 1,
    backgroundColor: colors.gray500,
  },
  // Botão de salvar (azul)
  saveButton: {
    flex: 1,
    backgroundColor: colors.primary,
  },
});

export default TaskForm;