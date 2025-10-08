/**
 * VerificationPill Component
 * Small badge to indicate verified/estimated nutrition data
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';

interface VerificationPillProps {
  verified: boolean;
}

export default function VerificationPill({ verified }: VerificationPillProps) {
  return (
    <View style={[styles.pill, verified ? styles.verified : styles.estimated]}>
      <Ionicons
        name={verified ? 'checkmark-circle' : 'information-circle'}
        size={12}
        color={verified ? theme.colors.success : theme.colors.warning}
      />
      <Text style={[styles.text, verified ? styles.verifiedText : styles.estimatedText]}>
        {verified ? 'Verified' : 'Estimated'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    gap: 4,
  },
  verified: {
    backgroundColor: '#e8f5e9',
  },
  estimated: {
    backgroundColor: '#fff3e0',
  },
  text: {
    fontSize: theme.typography.sizes.xs,
    fontWeight: theme.typography.weights.medium,
  },
  verifiedText: {
    color: theme.colors.success,
  },
  estimatedText: {
    color: theme.colors.warning,
  },
});
