/**
 * Recipe Detail Screen
 * Shows full recipe with nutrition, steps, and quick refine actions
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../theme';
import t from '../../../i18n';
import { useRecipeStore } from '../../../stores/recipeStore';
import MacroStrip from '../../../components/nutrition/MacroStrip';
import TimingBadges from '../../../components/badges/TimingBadges';
import AllergyBanner from '../../../components/badges/AllergyBanner';
import ProTipPanel from '../../../components/cards/ProTipPanel';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import type { Recipe } from '../../../types/models';

export default function RecipeDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe } = (route.params as { recipe: Recipe }) || {};

  const [showAllSteps, setShowAllSteps] = useState(false);
  const [refineModalVisible, setRefineModalVisible] = useState(false);
  const [refineAction, setRefineAction] = useState<
    'boost_protein' | 'swap_ingredient' | 'regenerate'
  >('boost_protein');

  const { refine, isGenerating, loadAlternatives, alternatives } = useRecipeStore();

  React.useEffect(() => {
    if (recipe && alternatives.length === 0) {
      loadAlternatives(recipe);
    }
  }, [recipe]);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No recipe found</Text>
      </SafeAreaView>
    );
  }

  const visibleSteps = showAllSteps ? recipe.steps : recipe.steps.slice(0, 2);

  const handleRefine = async () => {
    setRefineModalVisible(false);
    await refine({
      recipeId: recipe.id,
      action: refineAction,
    });
  };

  const handleStartCooking = () => {
    navigation.navigate('StepsOverview', { recipe });
  };

  const openRefineModal = (action: typeof refineAction) => {
    setRefineAction(action);
    setRefineModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="heart-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={24} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Placeholder */}
        <View style={styles.heroPlaceholder}>
          <Ionicons name="restaurant" size={60} color={theme.colors.textLight} />
        </View>

        {/* Title */}
        <Text style={styles.title}>{recipe.title}</Text>

        {/* Timing & Pantry Badges */}
        <TimingBadges timingTag={recipe.timingTag} pantryMatch={recipe.pantryMatch} />

        {/* Nutrition */}
        <MacroStrip
          calories={recipe.nutrition.calories}
          protein_g={recipe.nutrition.protein_g}
          carbs_g={recipe.nutrition.carbs_g}
          fat_g={recipe.nutrition.fat_g}
          verified={recipe.nutrition.verified}
        />

        {/* Allergy Warning */}
        {recipe.allergyWarnings && <AllergyBanner warnings={recipe.allergyWarnings} />}

        {/* Quick Refine Actions */}
        <View style={styles.refineSection}>
          <Text style={styles.sectionTitle}>Quick Refine</Text>
          <View style={styles.refineButtons}>
            <TouchableOpacity
              style={styles.refineButton}
              onPress={() => openRefineModal('boost_protein')}
              disabled={isGenerating}
            >
              <Ionicons name="fitness" size={20} color={theme.colors.primary} />
              <Text style={styles.refineButtonText}>Boost Protein</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.refineButton}
              onPress={() => openRefineModal('swap_ingredient')}
              disabled={isGenerating}
            >
              <Ionicons name="swap-horizontal" size={20} color={theme.colors.primary} />
              <Text style={styles.refineButtonText}>Swap Ingredient</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.refineButton}
              onPress={() => openRefineModal('regenerate')}
              disabled={isGenerating}
            >
              <Ionicons name="refresh" size={20} color={theme.colors.primary} />
              <Text style={styles.refineButtonText}>Regenerate</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {recipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color={theme.colors.primary} />
              <Text style={styles.ingredientText}>
                {ingredient.name} {ingredient.qty && `(${ingredient.qty})`}
              </Text>
            </View>
          ))}
        </View>

        {/* Steps */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Steps</Text>
            {recipe.steps.length > 2 && (
              <TouchableOpacity onPress={() => setShowAllSteps(!showAllSteps)}>
                <Text style={styles.toggleText}>
                  {showAllSteps ? 'Show Less' : `Show All (${recipe.steps.length})`}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {visibleSteps.map((step) => (
            <View key={step.index} style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.index}</Text>
              </View>
              <Text style={styles.stepText}>{step.text}</Text>
            </View>
          ))}
        </View>

        {/* Pro Tips */}
        {recipe.proTips && <ProTipPanel tips={recipe.proTips} />}

        {/* Alternatives */}
        {alternatives.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>You Might Also Like</Text>
            {alternatives.map((alt) => (
              <TouchableOpacity
                key={alt.id}
                style={styles.alternativeCard}
                onPress={() => navigation.navigate('RecipeDetail', { recipe: alt })}
              >
                <Text style={styles.alternativeTitle}>{alt.title}</Text>
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Fixed Footer CTA */}
      <View style={styles.footer}>
        <PrimaryButton
          title={t('recipe.startCooking')}
          onPress={handleStartCooking}
          loading={isGenerating}
        />
      </View>

      {/* Refine Modal */}
      <Modal
        visible={refineModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setRefineModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {refineAction === 'boost_protein' && 'Boost Protein'}
              {refineAction === 'swap_ingredient' && 'Swap Ingredient'}
              {refineAction === 'regenerate' && 'Regenerate Recipe'}
            </Text>
            <Text style={styles.modalDescription}>
              {refineAction === 'boost_protein' &&
                'Increase protein content by 50% with suggested additions.'}
              {refineAction === 'swap_ingredient' &&
                'Replace ingredients with similar alternatives.'}
              {refineAction === 'regenerate' && 'Generate a completely new recipe variation.'}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonOutline]}
                onPress={() => setRefineModalVisible(false)}
              >
                <Text style={styles.modalButtonTextOutline}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonPrimary]}
                onPress={handleRefine}
              >
                <Text style={styles.modalButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  iconButton: {
    padding: theme.spacing.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  heroPlaceholder: {
    height: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  refineSection: {
    marginVertical: theme.spacing.lg,
  },
  refineButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  refineButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  refineButtonText: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  section: {
    marginVertical: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  toggleText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  ingredientText: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text,
  },
  stepItem: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.bold,
  },
  stepText: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.relaxed,
  },
  alternativeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  alternativeTitle: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
  },
  modalTitle: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  modalDescription: {
    fontSize: theme.typography.sizes.base,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
    lineHeight: theme.typography.sizes.base * theme.typography.lineHeights.relaxed,
  },
  modalActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  modalButton: {
    flex: 1,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    minHeight: theme.layout.minTouchTarget,
    justifyContent: 'center',
  },
  modalButtonOutline: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: 'transparent',
  },
  modalButtonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  modalButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
  },
  modalButtonTextOutline: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
  },
});
