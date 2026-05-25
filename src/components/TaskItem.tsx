import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import type { TaskItemProps } from '../types';
import { colors, spacing, typography, borderRadius } from '../styles/theme';

function TaskItem({ task, onToggle, onDelete, onEdit }: Readonly<TaskItemProps>) {
  return (
    // Card da tarefa
    <View style={[styles.container, task.completed && styles.completed]}>
      {/* Área de conteúdo da tarefa */}
      <View style={styles.content}>
        {/* Título com estilo riscado se completado */}
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>
        {/* Descrição opcional */}
        {task.description ? (
          <Text style={[styles.description, task.completed && styles.descriptionCompleted]}>
            {task.description}
          </Text>
        ) : null}
      </View>
      
      {/* Área de botões de ação */}
      <View style={styles.actions}>
        {/* Botão para editar */}
        <TouchableOpacity
          onPress={() => onEdit(task.id)}
          style={[styles.button, styles.editButton]}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        
        {/* Botão para concluir ou desfazer */}
        <TouchableOpacity
          onPress={() => onToggle(task.id)}
          style={[styles.button, task.completed ? styles.undoButton : styles.completeButton]}
        >
          <Text style={styles.buttonText}>
            {task.completed ? "Desfazer" : "Concluir"}
          </Text>
        </TouchableOpacity>
        
        {/* Botão para remover tarefa */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirmar exclusão',
              'Tem certeza que deseja remover esta tarefa?',
              [
                {
                  text: 'Cancelar',
                  style: 'cancel'
                },
                {
                  text: 'Remover',
                  style: 'destructive',
                  onPress: () => onDelete(task.id)
                }
              ]
            );
          }}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
    // Fim do card da tarefa
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  // Card da tarefa com borda colorida à esquerda
  container: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  // Estilo quando tarefa está concluída
  completed: {
    borderLeftColor: colors.success,
    opacity: 0.7,
  },
  // Container do conteúdo textual
  content: {
    marginBottom: spacing.md,
  },
  // Título da tarefa
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
    color: colors.text,
  },
  // Título riscado quando completado
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textSecondary,
  },
  // Descrição opcional
  description: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  descriptionCompleted: {
    textDecorationLine: 'line-through',
  },
  // Container dos botões de ação
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  // Estilo base dos botões
  button: {
    flex: 1,
    padding: spacing.sm + spacing.xs / 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  // Botão azul para editar
  editButton: {
    backgroundColor: colors.primary,
  },
  // Botão verde para concluir
  completeButton: {
    backgroundColor: colors.success,
  },
  // Botão laranja para desfazer
  undoButton: {
    backgroundColor: colors.warning,
  },
  // Botão vermelho para remover
  deleteButton: {
    backgroundColor: colors.danger,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
});

export default TaskItem;