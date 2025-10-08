/**
 * Recipe Store Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecipeStore } from '../recipeStore';
import * as aiService from '../../services/ai';
import type { Recipe, GenerateRecipeInput } from '../../types/models';

jest.mock('@react-native-async-storage/async-storage');
jest.mock('../../services/ai');

const mockRecipe: Recipe = {
  id: 'recipe-1',
  title: 'Spicy Chicken Stir-Fry',
  nutrition: {
    calories: 450,
    protein_g: 32,
    carbs_g: 45,
    fat_g: 15,
    verified: false,
  },
  timingTag: 'post_workout',
  pantryMatch: 'uses_pantry',
  allergyWarnings: [],
  ingredients: [
    { name: 'Chicken breast', qty: '200g' },
    { name: 'Bell peppers', qty: '1 cup' },
  ],
  steps: [
    { index: 0, text: 'Heat oil in a wok' },
    { index: 1, text: 'Cook chicken until golden' },
  ],
  proTips: ['Use high heat for best results'],
  verifiedBy: null,
  createdAt: Date.now(),
};

describe('recipeStore', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);

    // Clear store state between tests
    await act(async () => {
      useRecipeStore.setState({
        currentRecipe: null,
        alternatives: [],
        recentRecipes: [],
        savedRecipes: [],
        isGenerating: false,
        error: null,
      });
    });
  });

  describe('generate', () => {
    it('should generate a recipe and add to recent recipes', async () => {
      (aiService.generateRecipe as jest.Mock).mockResolvedValue(mockRecipe);

      const { result } = renderHook(() => useRecipeStore());

      const input: GenerateRecipeInput = {
        pantryItems: ['Chicken', 'Bell peppers'],
        dietaryFilters: ['none'],
        goals: ['fitness'],
      };

      await act(async () => {
        await result.current.generate(input);
      });

      expect(result.current.currentRecipe).toEqual(mockRecipe);
      expect(result.current.recentRecipes).toContain(mockRecipe);
      expect(result.current.isGenerating).toBe(false);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@kitchengenie:recent_recipes',
        expect.any(String)
      );
    });

    it('should handle generation errors', async () => {
      const error = new Error('Generation failed');
      (aiService.generateRecipe as jest.Mock).mockRejectedValue(error);

      const { result } = renderHook(() => useRecipeStore());

      const input: GenerateRecipeInput = {
        pantryItems: ['Chicken'],
        dietaryFilters: ['none'],
        goals: ['fitness'],
      };

      await act(async () => {
        await result.current.generate(input);
      });

      expect(result.current.error).toBe('Generation failed');
      expect(result.current.isGenerating).toBe(false);
    });
  });

  describe('loadRecentRecipes', () => {
    it('should load recent recipes from storage', async () => {
      const storedRecipes = [mockRecipe];
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(storedRecipes));

      const { result } = renderHook(() => useRecipeStore());

      await act(async () => {
        await result.current.loadRecentRecipes();
      });

      expect(result.current.recentRecipes).toEqual(storedRecipes);
    });

    it('should handle empty storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => useRecipeStore());

      await act(async () => {
        await result.current.loadRecentRecipes();
      });

      expect(result.current.recentRecipes).toEqual([]);
    });
  });

  describe('saveRecipe', () => {
    it('should add recipe to saved recipes', async () => {
      const { result } = renderHook(() => useRecipeStore());

      await act(async () => {
        await result.current.saveRecipe(mockRecipe);
      });

      expect(result.current.savedRecipes).toContain(mockRecipe);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        '@kitchengenie:saved_recipes',
        expect.any(String)
      );
    });

    it('should not duplicate saved recipes', async () => {
      const { result } = renderHook(() => useRecipeStore());

      await act(async () => {
        await result.current.saveRecipe(mockRecipe);
        await result.current.saveRecipe(mockRecipe);
      });

      expect(result.current.savedRecipes.length).toBe(1);
    });
  });

  describe('unsaveRecipe', () => {
    it('should remove recipe from saved recipes', async () => {
      const { result } = renderHook(() => useRecipeStore());

      await act(async () => {
        await result.current.saveRecipe(mockRecipe);
        await result.current.unsaveRecipe(mockRecipe.id);
      });

      expect(result.current.savedRecipes).not.toContain(mockRecipe);
    });
  });

  describe('setCurrentRecipe', () => {
    it('should set current recipe and clear alternatives', async () => {
      const { result } = renderHook(() => useRecipeStore());

      act(() => {
        result.current.setCurrentRecipe(mockRecipe);
      });

      expect(result.current.currentRecipe).toEqual(mockRecipe);
      expect(result.current.alternatives).toEqual([]);
    });
  });
});
