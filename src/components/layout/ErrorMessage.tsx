/**
 * ErrorMessage Component
 * Displays error messages with retry option
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  fullScreen?: boolean;
}

export default function ErrorMessage({ message, onRetry, fullScreen = false }: ErrorMessageProps) {
  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.container;

  return (
    <View style={containerStyle}>
      <Ionicons name="alert-circle" size={48} color={theme.colors.error} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Ionicons name="refresh" size={20} color={theme.colors.white} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  message: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.sm,
  },
  retryText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
  },
});
