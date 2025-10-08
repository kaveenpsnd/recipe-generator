/**
 * TimingBadges Component
 * Shows timing tags and pantry match status
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';
import type { TimingTag, PantryMatch } from '../../types/models';

export interface TimingBadgesProps {
  timingTag?: TimingTag;
  pantryMatch: PantryMatch;
}

const TIMING_ICONS: Record<TimingTag, string> = {
  pre_workout: '🏃‍♂️',
  post_workout: '💪',
  recovery: '🧘',
  kid_friendly: '👶',
  family_friendly: '👨‍👩‍👧‍👦',
};

const TIMING_LABELS: Record<TimingTag, string> = {
  pre_workout: 'Pre-Workout',
  post_workout: 'Post-Workout',
  recovery: 'Recovery',
  kid_friendly: 'Kid-Friendly',
  family_friendly: 'Family-Friendly',
};

export default function TimingBadges({ timingTag, pantryMatch }: TimingBadgesProps) {
  return (
    <View style={styles.container}>
      {timingTag && (
        <View style={styles.badge}>
          <Text style={styles.icon}>{TIMING_ICONS[timingTag]}</Text>
          <Text style={styles.text}>{TIMING_LABELS[timingTag]}</Text>
        </View>
      )}

      <View style={[styles.badge, styles.pantryBadge]}>
        <Ionicons
          name={pantryMatch === 'uses_pantry' ? 'checkmark-circle' : 'cart'}
          size={16}
          color={pantryMatch === 'uses_pantry' ? theme.colors.success : theme.colors.textSecondary}
        />
        <Text style={styles.text}>
          {pantryMatch === 'uses_pantry' ? 'Uses Pantry' : 'Needs Items'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginVertical: theme.spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  pantryBadge: {
    backgroundColor: theme.colors.white,
  },
  icon: {
    fontSize: theme.typography.sizes.base,
  },
  text: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text,
  },
});
