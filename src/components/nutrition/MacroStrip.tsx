/**
 * MacroStrip Component
 * Displays nutrition macros with protein highlighted first
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../theme';
import { formatNutrition } from '../../utils/formatters';

export interface MacroStripProps {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  verified: boolean;
}

export default function MacroStrip({
  calories,
  protein_g,
  carbs_g,
  fat_g,
  verified,
}: MacroStripProps) {
  return (
    <View style={styles.container}>
      <View style={styles.macroItem}>
        <Text style={[styles.macroValue, styles.proteinValue]}>
          {formatNutrition(protein_g, 'g')}
        </Text>
        <Text style={styles.macroLabel}>Protein</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.macroItem}>
        <Text style={styles.macroValue}>{formatNutrition(calories, '')}</Text>
        <Text style={styles.macroLabel}>Calories</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.macroItem}>
        <Text style={styles.macroValue}>{formatNutrition(carbs_g, 'g')}</Text>
        <Text style={styles.macroLabel}>Carbs</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.macroItem}>
        <Text style={styles.macroValue}>{formatNutrition(fat_g, 'g')}</Text>
        <Text style={styles.macroLabel}>Fat</Text>
      </View>

      {!verified && (
        <View style={styles.estimatedBadge}>
          <Text style={styles.estimatedText}>Estimated</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.sm,
  },
  macroItem: {
    flex: 1,
    alignItems: 'center',
  },
  macroValue: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  proteinValue: {
    color: theme.colors.protein,
  },
  macroLabel: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
  },
  estimatedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.warning,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.sm,
  },
  estimatedText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.white,
    fontWeight: theme.typography.weights.semibold,
  },
});
