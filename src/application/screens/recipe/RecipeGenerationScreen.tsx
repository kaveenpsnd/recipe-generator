import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import theme from '../../../theme';
import t from '../../../i18n';
import { useRecipeStore } from '../../../stores/recipeStore';
import { usePantryStore } from '../../../stores/pantryStore';
import type { DietaryFilter, Goal } from '../../../types/models';
import { DIETARY_FILTERS, GOALS } from '../../../utils/constants';

export default function RecipeGenerationScreen() {
  const navigation = useNavigation();
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<DietaryFilter[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);

  const { generate, isGenerating, currentRecipe } = useRecipeStore();
  const { items: pantryItems } = usePantryStore();

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUsePantry = () => {
    const pantryNames = pantryItems.map((item) => item.name);
    setIngredients(pantryNames);
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      return;
    }

    await generate({
      pantryItems: ingredients,
      dietaryFilters: selectedDietary,
      goals: selectedGoals,
    });

    if (currentRecipe) {
      navigation.navigate('RecipeDetail', {
        recipe: currentRecipe,
        fromGeneration: true,
      });
    }
  };

  const toggleDietary = (filter: DietaryFilter) => {
    setSelectedDietary((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const toggleGoal = (goal: Goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{t('recipe.generate')}</Text>

        {/* Ingredient Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('recipe.ingredients')}</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={ingredientInput}
              onChangeText={setIngredientInput}
              placeholder="Add an ingredient..."
              onSubmitEditing={handleAddIngredient}
              returnKeyType="done"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.pantryButton} onPress={handleUsePantry}>
            <Text style={styles.pantryButtonText}>Use My Pantry ({pantryItems.length} items)</Text>
          </TouchableOpacity>

          {/* Ingredient Chips */}
          <View style={styles.chipContainer}>
            {ingredients.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}
                onPress={() => handleRemoveIngredient(index)}
              >
                <Text style={styles.chipText}>{ingredient}</Text>
                <Text style={styles.chipRemove}> ✕</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dietary Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <View style={styles.chipContainer}>
            {DIETARY_FILTERS.map((filter) => (
              <TouchableOpacity
                key={filter.value}
                style={[
                  styles.filterChip,
                  selectedDietary.includes(filter.value as DietaryFilter) &&
                    styles.filterChipSelected,
                ]}
                onPress={() => toggleDietary(filter.value as DietaryFilter)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    selectedDietary.includes(filter.value as DietaryFilter) &&
                      styles.filterChipTextSelected,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Goals</Text>
          <View style={styles.chipContainer}>
            {GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.value}
                style={[
                  styles.goalChip,
                  selectedGoals.includes(goal.value as Goal) && styles.goalChipSelected,
                ]}
                onPress={() => toggleGoal(goal.value as Goal)}
              >
                <Text style={styles.goalIcon}>{goal.icon}</Text>
                <Text
                  style={[
                    styles.goalChipText,
                    selectedGoals.includes(goal.value as Goal) && styles.goalChipTextSelected,
                  ]}
                >
                  {goal.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Generate Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.generateButton, ingredients.length === 0 && styles.generateButtonDisabled]}
          onPress={handleGenerate}
          disabled={isGenerating || ingredients.length === 0}
        >
          {isGenerating ? (
            <ActivityIndicator color={theme.colors.white} />
          ) : (
            <Text style={styles.generateButtonText}>Generate Recipe</Text>
          )}
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
  scrollContent: {
    padding: theme.spacing.md,
    paddingBottom: 100,
  },
  title: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.base,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
  },
  addButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.weights.semibold,
  },
  pantryButton: {
    backgroundColor: theme.colors.secondary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  pantryButtonText: {
    color: theme.colors.white,
    fontWeight: theme.typography.weights.semibold,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
  },
  chipText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.sm,
  },
  chipRemove: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.base,
    marginLeft: theme.spacing.xs,
  },
  filterChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
  },
  filterChipTextSelected: {
    color: theme.colors.white,
  },
  goalChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
  },
  goalChipSelected: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  goalIcon: {
    fontSize: theme.typography.sizes.lg,
  },
  goalChipText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
  },
  goalChipTextSelected: {
    color: theme.colors.white,
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
  generateButton: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    minHeight: theme.layout.minTouchTarget,
  },
  generateButtonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  generateButtonText: {
    color: theme.colors.white,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
  },
});
