/**
 * RecipeCard Component
 * Card for displaying recipe preview in lists/carousels
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../theme';
import type { Recipe } from '../../types/models';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  compact?: boolean;
}

export default function RecipeCard({ recipe, onPress, compact = false }: RecipeCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Image Placeholder */}
      <View style={[styles.imageContainer, compact && styles.imageContainerCompact]}>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="restaurant" size={compact ? 32 : 48} color={theme.colors.primary} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
          {recipe.title}
        </Text>

        {/* Stats Row */}
        <View style={styles.stats}>
          {recipe.timingTag && (
            <View style={styles.stat}>
              <Ionicons name="time-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.statText}>{recipe.timingTag}</Text>
            </View>
          )}

          {recipe.nutrition && (
            <View style={styles.stat}>
              <Ionicons name="flame-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.statText}>{recipe.nutrition.calories} cal</Text>
            </View>
          )}

          {recipe.ingredients && (
            <View style={styles.stat}>
              <Ionicons name="list-outline" size={14} color={theme.colors.textSecondary} />
              <Text style={styles.statText}>{recipe.ingredients.length} items</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    ...theme.shadows.md,
    marginBottom: theme.spacing.md,
  },
  cardCompact: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  imageContainer: {
    height: 180,
    backgroundColor: theme.colors.primaryLight,
  },
  imageContainerCompact: {
    width: 100,
    height: 100,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
  },
  content: {
    padding: theme.spacing.md,
    flex: 1,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  titleCompact: {
    fontSize: theme.typography.sizes.base,
    marginBottom: 4,
  },
  description: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 18,
  },
  stats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    flexWrap: 'wrap',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.textSecondary,
  },
});
