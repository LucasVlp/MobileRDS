/**
 * Componente de cabeçalho da lista
 * Mostra contador de tarefas total e concluídas
 */

import { View, Text, StyleSheet } from 'react-native';
import type { ListHeaderProps } from '../types';
import { colors, spacing, typography } from '../styles/theme';

export const ListHeader = ({ tasksCount, completedCount }: ListHeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.title}>Suas Tarefas ({tasksCount})</Text>
    {tasksCount > 0 && (
      <Text style={styles.count}>{completedCount} concluídas</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text,
  },
  count: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
});