/**
 * ProTipPanel Component
 * Displays cooking pro tips
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

export interface ProTipPanelProps {
  tips?: string[];
  defaultOpen?: boolean;
}

export default function ProTipPanel({ tips, defaultOpen = true }: ProTipPanelProps) {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="bulb" size={20} color={theme.colors.warning} />
        <Text style={styles.title}>Pro Tips</Text>
      </View>

      {defaultOpen && (
        <View style={styles.tipsContainer}>
          {tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.infoLight,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  tipsContainer: {
    gap: theme.spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  bullet: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.info,
    marginTop: -2,
  },
  tipText: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.relaxed,
  },
});
