/**
 * KitchenGenie Type Definitions
 * Core data models for the application
 */

export type DietaryFilter = 'vegan' | 'vegetarian' | 'gluten_free' | 'low_cost' | 'none';
export type Goal = 'fitness' | 'family' | 'health';
export type TimingTag = 'pre_workout' | 'post_workout' | 'recovery' | 'kid_friendly' | 'family_friendly';
export type PantryMatch = 'uses_pantry' | 'needs_items';
export type IngredientSource = 'manual' | 'camera' | 'barcode' | 'voice';
export type VerifiedBy = 'chef' | 'nutritionist' | null;
export type BadgeType = 'chef_verified' | 'nutritionist_verified';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  dietaryPreference: DietaryFilter;
  goals: Goal[];
  avatarUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity?: string;   // "1L", "500g", "2 cups"
  category?: string;   // "Vegetables", "Dairy", "Grains", etc.
  expiresAt?: number;  // epoch ms
  source: IngredientSource;
  valid: boolean;
  addedAt: number;
}

export interface Nutrition {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  verified: boolean;   // false → show "Estimated"
}

export interface Ingredient {
  name: string;
  qty?: string;
}

export interface RecipeStep {
  index: number;
  text: string;
  imageUrl?: string;
}

export interface Recipe {
  id: string;
  title: string;
  heroUrl?: string;
  nutrition: Nutrition;
  timingTag?: TimingTag;
  pantryMatch: PantryMatch;
  allergyWarnings?: string[];   // e.g., ["peanuts", "dairy"]
  ingredients: Ingredient[];
  steps: RecipeStep[];
  proTips?: string[];
  verifiedBy?: VerifiedBy;
  createdAt: number;
}

export interface CommunityPost {
  id: string;
  authorUid: string;
  authorName: string;
  authorAvatar?: string;
  imageUrl: string;
  caption: string;
  tags: string[]; // ["kid-friendly", "high-protein"]
  badges?: BadgeType[];
  likeCount: number;
  commentCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorUid: string;
  authorName: string;
  authorAvatar?: string;
  text: string;
  createdAt: number;
}

export interface GenerateRecipeInput {
  pantryItems: string[];
  dietaryFilters: DietaryFilter[];
  goals: Goal[];
}

export interface RefineRecipeInput {
  recipeId: string;
  action: 'boost_protein' | 'swap_ingredient' | 'regenerate';
  targetIngredient?: string; // for swap_ingredient
}
