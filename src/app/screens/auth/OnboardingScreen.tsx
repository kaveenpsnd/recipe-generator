import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';
import t from '../../../i18n';

export default function OnboardingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('onboarding.slide1.title')}</Text>
      <Text style={styles.description}>{t('onboarding.slide1.description')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
