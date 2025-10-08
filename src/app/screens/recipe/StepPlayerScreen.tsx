/**
 * Step Player Screen
 * Interactive step-by-step cooking mode
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../theme';
import type { Recipe } from '../../../types/models';

export default function StepPlayerScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { recipe, stepIndex } = (route.params as { recipe: Recipe; stepIndex: number }) || {};

  const [currentStep, setCurrentStep] = useState(stepIndex || 0);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>No recipe found</Text>
      </SafeAreaView>
    );
  }

  const step = recipe.steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === recipe.steps.length - 1;
  const progress = ((currentStep + 1) / recipe.steps.length) * 100;

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished cooking
      navigation.goBack();
    }
  };

  const handleRepeat = () => {
    // In future, this could trigger voice playback
    // Placeholder for voice playback functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.stepCounter}>
            Step {currentStep + 1} of {recipe.steps.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.stepNumberContainer}>
          <View style={styles.stepNumberLarge}>
            <Text style={styles.stepNumberTextLarge}>{step.index}</Text>
          </View>
        </View>

        <Text style={styles.stepText}>{step.text}</Text>

        {step.imageUrl && (
          <View style={styles.imagePlaceholder}>
            <Ionicons name="image-outline" size={48} color={theme.colors.textLight} />
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonSecondary]}
          onPress={handleBack}
          disabled={isFirstStep}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={isFirstStep ? theme.colors.disabled : theme.colors.primary}
          />
          <Text style={[styles.controlButtonText, isFirstStep && styles.controlButtonTextDisabled]}>
            Back
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonSecondary]}
          onPress={handleRepeat}
        >
          <Ionicons name="volume-high" size={24} color={theme.colors.secondary} />
          <Text style={[styles.controlButtonText, { color: theme.colors.secondary }]}>Repeat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonPrimary]}
          onPress={handleNext}
        >
          <Text style={styles.controlButtonTextPrimary}>{isLastStep ? 'Finish' : 'Next'}</Text>
          <Ionicons name="arrow-forward" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  closeButton: {
    padding: theme.spacing.xs,
  },
  headerInfo: {
    flex: 1,
  },
  stepCounter: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.success,
  },
  content: {
    flex: 1,
    padding: theme.spacing.xl,
    justifyContent: 'center',
  },
  stepNumberContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xxl,
  },
  stepNumberLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.lg,
  },
  stepNumberTextLarge: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.huge,
    fontWeight: theme.typography.weights.bold,
  },
  stepText: {
    fontSize: theme.typography.sizes.xxl,
    color: theme.colors.text,
    lineHeight: theme.typography.sizes.xxl * theme.typography.lineHeights.relaxed,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  controls: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    minHeight: theme.layout.minTouchTarget,
  },
  controlButtonSecondary: {
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  controlButtonPrimary: {
    backgroundColor: theme.colors.primary,
    ...theme.shadows.md,
  },
  controlButtonText: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.primary,
  },
  controlButtonTextDisabled: {
    color: theme.colors.disabled,
  },
  controlButtonTextPrimary: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.white,
  },
});
