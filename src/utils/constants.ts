/**
 * Application Constants
 */

export const PANTRY_CATEGORIES = [
  'Vegetables',
  'Fruits',
  'Dairy',
  'Meat & Poultry',
  'Seafood',
  'Grains',
  'Legumes',
  'Nuts & Seeds',
  'Oils & Fats',
  'Spices & Herbs',
  'Condiments',
  'Beverages',
  'Other',
] as const;

export const QUICK_ADD_STAPLES = [
  { name: 'Olive Oil', category: 'Oils & Fats' },
  { name: 'Salt', category: 'Spices & Herbs' },
  { name: 'Black Pepper', category: 'Spices & Herbs' },
  { name: 'Garlic', category: 'Vegetables' },
  { name: 'Onion', category: 'Vegetables' },
  { name: 'Rice', category: 'Grains' },
  { name: 'Pasta', category: 'Grains' },
  { name: 'Flour', category: 'Grains' },
  { name: 'Sugar', category: 'Condiments' },
  { name: 'Eggs', category: 'Dairy' },
  { name: 'Milk', category: 'Dairy' },
  { name: 'Butter', category: 'Dairy' },
];

export const DIETARY_FILTERS = [
  { value: 'none', label: 'No Restriction' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'gluten_free', label: 'Gluten Free' },
  { value: 'low_cost', label: 'Low Cost' },
] as const;

export const GOALS = [
  { value: 'fitness', label: 'Fitness', icon: '💪' },
  { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { value: 'health', label: 'Health', icon: '❤️' },
] as const;

export const TIMING_TAGS = [
  { value: 'pre_workout', label: 'Pre-Workout', icon: '🏃‍♂️' },
  { value: 'post_workout', label: 'Post-Workout', icon: '💪' },
  { value: 'recovery', label: 'Recovery', icon: '🧘' },
  { value: 'kid_friendly', label: 'Kid-Friendly', icon: '👶' },
  { value: 'family_friendly', label: 'Family-Friendly', icon: '👨‍👩‍👧‍👦' },
] as const;

export const COMMON_ALLERGENS = [
  'peanuts',
  'tree nuts',
  'milk',
  'eggs',
  'wheat',
  'soy',
  'fish',
  'shellfish',
  'sesame',
];

export const MAX_PANTRY_ITEMS = 100;
export const MAX_RECIPE_ALTERNATIVES = 2;
export const CAPTION_MAX_LENGTH = 120;
export const EXPIRING_SOON_DAYS = 3;

// Firebase collection names
export const COLLECTIONS = {
  USERS: 'users',
  RECIPES: 'recipes',
  PANTRY: 'pantry',
  POSTS: 'posts',
  COMMENTS: 'comments',
  SAVED_RECIPES: 'saved_recipes',
} as const;

// AsyncStorage keys
export const STORAGE_KEYS = {
  USER_TOKEN: '@kitchengenie:user_token',
  USER_PROFILE: '@kitchengenie:user_profile',
  PANTRY_ITEMS: '@kitchengenie:pantry_items',
  ONBOARDING_COMPLETED: '@kitchengenie:onboarding_completed',
} as const;
