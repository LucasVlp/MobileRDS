/**
 * Componente de lista de tarefas
 * Renderiza todas as tarefas usando FlatList
 */

import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';
import { ListHeader } from './ListHeader';
import { ListEmpty } from './ListEmpty';
import { MESSAGES } from '../utils/constants';
import type { TaskListProps } from '../types';
import { colors, spacing, typography } from '../styles/theme';

// Cria o componente de cabeçalho da lista
const createListHeader = (tasksCount: number, completedCount: number) => (
  <ListHeader tasksCount={tasksCount} completedCount={completedCount} />
);

// Cria o componente de lista vazia
const createListEmpty = () => <ListEmpty />;

function TaskList({ tasks, loading, onToggle, onDelete, onEdit }: Readonly<TaskListProps>) {
  // Calcula quantas tarefas estão concluídas
  const completedCount = tasks.filter(task => task.completed).length;

  // Exibe indicador de carregamento
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>{MESSAGES.LOADING}</Text>
      </View>
    );
  }

  return (
    // Lista otimizada para renderização de tarefas
    <FlatList
      style={styles.container}
      data={tasks} // Array de tarefas
      keyExtractor={(item) => item.id.toString()} // Chave única para cada item
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      ListHeaderComponent={createListHeader(tasks.length, completedCount)} // Cabeçalho com contador
      ListEmptyComponent={createListEmpty()} // Exibido quando não há tarefas
      showsVerticalScrollIndicator={false} // Remove barra de rolagem
      keyboardShouldPersistTaps='handled' // Permite tocar nos botões mesmo com teclado aberto
      keyboardDismissMode='on-drag' // Fecha teclado ao arrastar a lista
    />
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  // Container ocupa toda a tela disponível
  container: {
    flex: 1,
  },
  // Container centralizado para loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
});

export default TaskList;