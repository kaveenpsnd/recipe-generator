/**
 * AllergyBanner Component
 * Displays allergy warnings prominently
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

export interface AllergyBannerProps {
  warnings: string[];
}

export default function AllergyBanner({ warnings }: AllergyBannerProps) {
  if (!warnings || warnings.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Ionicons name="warning" size={20} color={theme.colors.white} />
      <Text style={styles.text}>Contains: {warnings.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.error,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.md,
  },
  text: {
    flex: 1,
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
});
