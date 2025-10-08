/**
 * Recipe Store
 * Manages recipe generation, alternatives, and refinements
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Recipe, GenerateRecipeInput, RefineRecipeInput } from '../types/models';
import { generateRecipe, generateAlternatives, refineRecipe } from '../services/ai';
import { STORAGE_KEYS } from '../utils/constants';

interface RecipeState {
  currentRecipe: Recipe | null;
  alternatives: Recipe[];
  recentRecipes: Recipe[];
  savedRecipes: Recipe[];
  isGenerating: boolean;
  error: string | null;

  // Actions
  generate: (input: GenerateRecipeInput) => Promise<void>;
  loadAlternatives: (recipe: Recipe) => Promise<void>;
  refine: (input: RefineRecipeInput) => Promise<void>;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  loadRecentRecipes: () => Promise<void>;
  saveRecipe: (recipe: Recipe) => Promise<void>;
  unsaveRecipe: (recipeId: string) => Promise<void>;
  clearError: () => void;
}

export const useRecipeStore = create<RecipeState>((set, get) => ({
  currentRecipe: null,
  alternatives: [],
  recentRecipes: [],
  savedRecipes: [],
  isGenerating: false,
  error: null,

  generate: async (input: GenerateRecipeInput) => {
    set({ isGenerating: true, error: null });
    try {
      const recipe = await generateRecipe(input);
      set({ currentRecipe: recipe, isGenerating: false });

      // Add to recent recipes
      const recentRecipes = [
        recipe,
        ...get().recentRecipes.filter((r) => r.id !== recipe.id),
      ].slice(0, 10);
      set({ recentRecipes });
      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_RECIPES, JSON.stringify(recentRecipes));
    } catch (error) {
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Failed to generate recipe',
      });
    }
  },

  loadAlternatives: async (recipe: Recipe) => {
    try {
      const alternatives = await generateAlternatives(recipe, 2);
      set({ alternatives });
    } catch (error) {
      console.error('Failed to load alternatives:', error);
    }
  },

  refine: async (input: RefineRecipeInput) => {
    set({ isGenerating: true, error: null });
    try {
      const recipe = await refineRecipe(input);
      set({ currentRecipe: recipe, isGenerating: false });

      // Add to recent recipes
      const recentRecipes = [
        recipe,
        ...get().recentRecipes.filter((r) => r.id !== recipe.id),
      ].slice(0, 10);
      set({ recentRecipes });
      await AsyncStorage.setItem(STORAGE_KEYS.RECENT_RECIPES, JSON.stringify(recentRecipes));
    } catch (error) {
      set({
        isGenerating: false,
        error: error instanceof Error ? error.message : 'Failed to refine recipe',
      });
    }
  },

  setCurrentRecipe: (recipe: Recipe | null) => {
    set({ currentRecipe: recipe, alternatives: [] });
  },

  loadRecentRecipes: async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.RECENT_RECIPES);
      const recentRecipes = stored ? JSON.parse(stored) : [];
      set({ recentRecipes });
    } catch (error) {
      console.error('Failed to load recent recipes:', error);
    }
  },

  saveRecipe: async (recipe: Recipe) => {
    const savedRecipes = [...get().savedRecipes.filter((r) => r.id !== recipe.id), recipe];
    set({ savedRecipes });
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_RECIPES, JSON.stringify(savedRecipes));
  },

  unsaveRecipe: async (recipeId: string) => {
    const savedRecipes = get().savedRecipes.filter((r) => r.id !== recipeId);
    set({ savedRecipes });
    await AsyncStorage.setItem(STORAGE_KEYS.SAVED_RECIPES, JSON.stringify(savedRecipes));
  },

  clearError: () => {
    set({ error: null });
  },
}));
