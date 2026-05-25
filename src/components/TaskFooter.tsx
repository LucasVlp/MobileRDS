/**
 * Componente de rodapé
 * Exibe informações adicionais no final da aplicação
 */

import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from '../styles/theme';

function TaskFooter() {
  return (
    <View style={styles.taskFooter}>
      <Text style={styles.text}>Feito para organizar suas tarefas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  taskFooter: {
    padding: spacing.md, 
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: typography.sizes.sm,
    color: colors.textSecondary,
  },
});

export default TaskFooter;