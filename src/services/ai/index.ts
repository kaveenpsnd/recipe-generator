/**
 * AI Service Adapter
 * Provides a swappable interface for AI recipe generation
 */

import type { Recipe, GenerateRecipeInput, RefineRecipeInput } from '../../types/models';
import * as MockService from './mockRecipeService';

// Service interface
export interface AIService {
  generateRecipe(input: GenerateRecipeInput): Promise<Recipe>;
  generateAlternatives(original: Recipe, count?: number): Promise<Recipe[]>;
  refineRecipe(input: RefineRecipeInput): Promise<Recipe>;
}

// Current implementation (mock)
const currentService: AIService = {
  generateRecipe: MockService.generateRecipe,
  generateAlternatives: MockService.generateAlternatives,
  refineRecipe: MockService.refineRecipe,
};

// Export service methods
export const { generateRecipe, generateAlternatives, refineRecipe } = currentService;

export default currentService;
