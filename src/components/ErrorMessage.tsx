/**
 * Componente de mensagem de erro
 * Exibe erros com opção de dispensar
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { ErrorMessageProps } from '../types';
import { colors, spacing, borderRadius } from '../styles/theme';

function ErrorMessage({ error, onDismiss }: ErrorMessageProps & { onDismiss?: () => void }) {
  // Não renderiza nada se não houver erro
  if (!error) return null;

  return (
    // Container do erro com fundo vermelho transparente
    <View style={styles.errorMessage}>
      <View style={styles.errorContent}>
        {/* Ícone de alerta */}
        <Text style={styles.errorIcon}>!</Text>
        {/* Mensagem de erro */}
        <Text style={styles.errorText}>{error}</Text>
        {/* Botão de fechar (opcional) */}
        {onDismiss && (
          <TouchableOpacity 
            onPress={onDismiss}
            style={styles.errorDismiss}
            accessibilityLabel="Fechar erro"
          >
            <Text style={styles.dismissText}>x</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorMessage: {
    backgroundColor: colors.dangerLight + '22',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.sm,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 20,
    color: colors.danger,
    fontWeight: 'bold',
    marginRight: spacing.sm,
  },
  errorText: {
    flex: 1,
    color: colors.danger,
    fontSize: 14,
  },
  errorDismiss: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  dismissText: {
    fontSize: 18,
    color: colors.danger,
    fontWeight: 'bold',
  },
});

export default ErrorMessage;