/**
 * Recipe Store
 * Manages recipe generation, alternatives, and refinements
 */

import { create } from 'zustand';
import type { Recipe, GenerateRecipeInput, RefineRecipeInput } from '../types/models';
import { generateRecipe, generateAlternatives, refineRecipe } from '../services/ai';

interface RecipeState {
  currentRecipe: Recipe | null;
  alternatives: Recipe[];
  isGenerating: boolean;
  error: string | null;

  // Actions
  generate: (input: GenerateRecipeInput) => Promise<void>;
  loadAlternatives: (recipe: Recipe) => Promise<void>;
  refine: (input: RefineRecipeInput) => Promise<void>;
  setCurrentRecipe: (recipe: Recipe | null) => void;
  clearError: () => void;
}

export const useRecipeStore = create<RecipeState>((set) => ({
  currentRecipe: null,
  alternatives: [],
  isGenerating: false,
  error: null,

  generate: async (input: GenerateRecipeInput) => {
    set({ isGenerating: true, error: null });
    try {
      const recipe = await generateRecipe(input);
      set({ currentRecipe: recipe, isGenerating: false });
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

  clearError: () => {
    set({ error: null });
  },
}));
