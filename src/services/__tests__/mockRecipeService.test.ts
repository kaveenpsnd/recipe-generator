/**
 * Mock Recipe Service Tests
 */

import { generateRecipe, refineRecipe } from '../ai/mockRecipeService';
import type { GenerateRecipeInput, RefineRecipeInput } from '../../types/models';

describe('mockRecipeService', () => {
  describe('generateRecipe', () => {
    it('should generate a recipe based on input', async () => {
      const input: GenerateRecipeInput = {
        pantryItems: ['chicken', 'rice', 'vegetables'],
        dietaryFilters: ['none'],
        goals: ['fitness'],
      };

      const recipe = await generateRecipe(input);

      expect(recipe).toBeDefined();
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toBeDefined();
      expect(recipe.nutrition).toBeDefined();
      expect(recipe.ingredients).toBeInstanceOf(Array);
      expect(recipe.steps).toBeInstanceOf(Array);
      expect(recipe.createdAt).toBeDefined();
    });

    it('should include nutrition information', async () => {
      const input: GenerateRecipeInput = {
        pantryItems: ['chicken'],
        dietaryFilters: ['none'],
        goals: ['fitness'],
      };

      const recipe = await generateRecipe(input);

      expect(recipe.nutrition.calories).toBeGreaterThan(0);
      expect(recipe.nutrition.protein_g).toBeGreaterThan(0);
      expect(recipe.nutrition.carbs_g).toBeGreaterThan(0);
      expect(recipe.nutrition.fat_g).toBeGreaterThan(0);
      expect(typeof recipe.nutrition.verified).toBe('boolean');
    });

    it('should have at least one ingredient', async () => {
      const input: GenerateRecipeInput = {
        pantryItems: ['pasta'],
        dietaryFilters: ['none'],
        goals: ['family'],
      };

      const recipe = await generateRecipe(input);

      expect(recipe.ingredients.length).toBeGreaterThan(0);
      recipe.ingredients.forEach((ingredient) => {
        expect(ingredient.name).toBeDefined();
      });
    });

    it('should have at least one step', async () => {
      const input: GenerateRecipeInput = {
        pantryItems: ['salmon'],
        dietaryFilters: ['none'],
        goals: ['health'],
      };

      const recipe = await generateRecipe(input);

      expect(recipe.steps.length).toBeGreaterThan(0);
      recipe.steps.forEach((step, index) => {
        expect(step.index).toBe(index + 1); // Steps are 1-indexed
        expect(step.text).toBeDefined();
      });
    });

    it('should simulate network delay', async () => {
      const input: GenerateRecipeInput = {
        pantryItems: ['chicken'],
        dietaryFilters: ['none'],
        goals: ['fitness'],
      };

      const startTime = Date.now();
      await generateRecipe(input);
      const endTime = Date.now();

      // Should take at least 800ms (simulated delay)
      expect(endTime - startTime).toBeGreaterThanOrEqual(800);
    });
  });

  describe('refineRecipe', () => {
    it('should refine recipe with boost_protein action', async () => {
      const input: RefineRecipeInput = {
        recipeId: 'test-recipe-1',
        action: 'boost_protein',
      };

      const recipe = await refineRecipe(input);

      expect(recipe).toBeDefined();
      expect(recipe.id).toBeDefined();
      expect(recipe.title).toContain('High-Protein');
    });

    it('should refine recipe with swap_ingredient action', async () => {
      const input: RefineRecipeInput = {
        recipeId: 'test-recipe-1',
        action: 'swap_ingredient',
        targetIngredient: 'chicken',
      };

      const recipe = await refineRecipe(input);

      expect(recipe).toBeDefined();
      expect(recipe.id).toBeDefined();
    });

    it('should refine recipe with regenerate action', async () => {
      const input: RefineRecipeInput = {
        recipeId: 'test-recipe-1',
        action: 'regenerate',
      };

      const recipe = await refineRecipe(input);

      expect(recipe).toBeDefined();
      expect(recipe.id).not.toBe('test-recipe-1'); // Should have new ID
    });

    it('should have different recipe ID after refinement', async () => {
      const input: RefineRecipeInput = {
        recipeId: 'original-id',
        action: 'boost_protein',
      };

      const recipe = await refineRecipe(input);

      expect(recipe.id).not.toBe('original-id');
    });
  });
});
