import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

export default function PantryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pantry</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
});
