/**
 * Componente de cabeçalho principal
 * Exibe título e descrição da aplicação
 */

import { Text, View, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../styles/theme";

function TaskHeader() {
  return (
    <View style={styles.taskHeader}>
      <Text style={styles.textHeader}>Lista de Tarefas</Text>
      <Text style={styles.textSubtitle}>
        Organize suas atividades de forma simples e eficiente
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  taskHeader: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    paddingTop: spacing.xl * 1.5,
  },
  textHeader: {
    color: colors.white,
    fontSize: typography.sizes.xxl,
    fontWeight: typography.weights.bold,
  },
  textSubtitle: {
    color: colors.white,
    fontSize: typography.sizes.md,
    marginTop: spacing.sm,
    opacity: 0.9,
  },
});

export default TaskHeader;
