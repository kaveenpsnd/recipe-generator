/**
 * Navigation Type Definitions
 * Screen params for type-safe navigation
 */

import type { Recipe, PantryItem, CommunityPost } from './models';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileSetup: undefined;
};

export type MainTabsParamList = {
  Home: undefined;
  Pantry: undefined;
  Community: undefined;
  Saved: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  Dashboard: undefined;
  RecipeGeneration: { pantryItems?: PantryItem[] };
  RecipeDetail: { recipe: Recipe; fromGeneration?: boolean };
  StepsOverview: { recipe: Recipe };
  StepPlayer: { recipe: Recipe; stepIndex: number };
  ShoppingList: { recipe: Recipe };
};

export type PantryStackParamList = {
  PantryList: undefined;
  AddPantryItem: undefined;
  EditPantryItem: { item: PantryItem };
};

export type CommunityStackParamList = {
  Feed: undefined;
  PostDetail: { post: CommunityPost };
  CreatePost: undefined;
};

// Root level screens (outside of tabs)
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  RecipeGeneration: { pantryItems?: PantryItem[] };
  RecipeDetail: { recipe: Recipe; fromGeneration?: boolean };
  StepsOverview: { recipe: Recipe };
  StepPlayer: { recipe: Recipe; stepIndex: number };
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
