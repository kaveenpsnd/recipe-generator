/**
 * Mock Recipe Service
 * Generates recipes based on pantry items, dietary filters, and goals
 * TODO: Replace with actual AI API integration
 */

import type {
  Recipe,
  GenerateRecipeInput,
  RefineRecipeInput,
  Nutrition,
  RecipeStep,
  TimingTag,
} from '../../types/models';
import { generateId } from '../../utils/formatters';

// Sample recipe templates
const RECIPE_TEMPLATES = [
  {
    title: 'Grilled Chicken with Roasted Vegetables',
    baseIngredients: ['chicken', 'vegetables', 'olive oil', 'garlic'],
    steps: [
      'Preheat your oven to 400°F (200°C)',
      'Season the chicken breast with salt, pepper, and herbs',
      'Chop vegetables into even-sized pieces',
      'Toss vegetables with olive oil and minced garlic',
      'Place chicken on a baking sheet with vegetables around it',
      'Roast for 25-30 minutes until chicken reaches 165°F internal temperature',
      'Let rest for 5 minutes before serving',
    ],
    baseNutrition: { calories: 350, protein_g: 42, carbs_g: 18, fat_g: 12, verified: false },
    timingTag: 'post_workout' as TimingTag,
    allergyWarnings: [],
  },
  {
    title: 'Veggie Pasta Primavera',
    baseIngredients: ['pasta', 'vegetables', 'olive oil', 'garlic', 'parmesan'],
    steps: [
      'Bring a large pot of salted water to boil',
      'Cook pasta according to package directions',
      'While pasta cooks, sauté vegetables in olive oil',
      'Add minced garlic and cook for 1 minute',
      'Drain pasta, reserving 1 cup pasta water',
      'Toss pasta with vegetables, adding pasta water as needed',
      'Top with grated parmesan and fresh herbs',
    ],
    baseNutrition: { calories: 420, protein_g: 14, carbs_g: 65, fat_g: 14, verified: false },
    timingTag: 'family_friendly' as TimingTag,
    allergyWarnings: ['wheat', 'dairy'],
  },
  {
    title: 'Protein-Packed Scrambled Eggs',
    baseIngredients: ['eggs', 'milk', 'butter', 'cheese'],
    steps: [
      'Crack eggs into a bowl and whisk with a splash of milk',
      'Heat butter in a non-stick pan over medium heat',
      'Pour in egg mixture and let sit for 20 seconds',
      'Gently stir with a spatula, creating large curds',
      'When eggs are nearly set but still creamy, remove from heat',
      'Fold in shredded cheese and let it melt',
      'Season with salt and pepper to taste',
    ],
    baseNutrition: { calories: 280, protein_g: 24, carbs_g: 4, fat_g: 19, verified: false },
    timingTag: 'pre_workout' as TimingTag,
    allergyWarnings: ['eggs', 'dairy'],
  },
  {
    title: 'Mediterranean Quinoa Bowl',
    baseIngredients: ['quinoa', 'chickpeas', 'cucumber', 'tomatoes', 'feta', 'olive oil'],
    steps: [
      'Rinse quinoa under cold water',
      'Cook quinoa in water (1:2 ratio) for 15 minutes',
      'Drain and rinse chickpeas',
      'Chop cucumber, tomatoes, and red onion',
      'Fluff cooked quinoa with a fork',
      'Mix quinoa with vegetables and chickpeas',
      'Top with crumbled feta and drizzle with olive oil and lemon juice',
    ],
    baseNutrition: { calories: 380, protein_g: 16, carbs_g: 52, fat_g: 14, verified: false },
    timingTag: 'health' as TimingTag,
    allergyWarnings: ['dairy'],
  },
];

function selectRecipeTemplate(ingredients: string[]): (typeof RECIPE_TEMPLATES)[0] {
  // Simple matching logic - pick based on ingredients mentioned
  const ingredientSet = new Set(ingredients.map((i) => i.toLowerCase()));

  for (const template of RECIPE_TEMPLATES) {
    const matches = template.baseIngredients.filter((ing) =>
      Array.from(ingredientSet).some((userIng) => userIng.includes(ing) || ing.includes(userIng)),
    );
    if (matches.length >= 2) {
      return template;
    }
  }

  // Default to first template
  return RECIPE_TEMPLATES[0];
}

function adjustNutritionForGoals(
  baseNutrition: Nutrition,
  goals: string[],
): Nutrition {
  const adjusted = { ...baseNutrition };

  if (goals.includes('fitness')) {
    // Increase protein by 25%
    adjusted.protein_g = Math.round(adjusted.protein_g * 1.25);
    adjusted.calories += Math.round(adjusted.protein_g * 0.25 * 4);
  }

  if (goals.includes('health')) {
    // Reduce fat slightly
    adjusted.fat_g = Math.round(adjusted.fat_g * 0.8);
    adjusted.calories -= Math.round(adjusted.fat_g * 0.2 * 9);
  }

  return { ...adjusted, verified: false };
}

function generateSteps(baseSteps: string[]): RecipeStep[] {
  return baseSteps.map((text, index) => ({
    index: index + 1,
    text,
  }));
}

function generateProTips(_title: string): string[] {
  const tips = [
    'Meal prep this recipe on Sunday for quick weekday meals',
    'Use a meat thermometer to ensure perfect doneness every time',
    'Let proteins rest before cutting to retain juices',
    'Season in layers throughout cooking for better flavor',
    'Taste and adjust seasoning at the end',
  ];

  // Return 2-3 random tips
  return tips.sort(() => Math.random() - 0.5).slice(0, 2 + Math.floor(Math.random() * 2));
}

/**
 * Generate a recipe from pantry items
 */
export async function generateRecipe(input: GenerateRecipeInput): Promise<Recipe> {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const template = selectRecipeTemplate(input.pantryItems);
  const nutrition = adjustNutritionForGoals(template.baseNutrition, input.goals);

  // Build ingredients list
  const ingredients = template.baseIngredients.map((name) => ({
    name,
    qty: undefined,
  }));

  // Add user's pantry items that aren't in base
  const additionalItems = input.pantryItems
    .filter((item) => !template.baseIngredients.some((base) => item.toLowerCase().includes(base)))
    .slice(0, 3);

  additionalItems.forEach((item) => {
    ingredients.push({ name: item, qty: undefined });
  });

  const recipe: Recipe = {
    id: generateId(),
    title: template.title,
    nutrition,
    timingTag: template.timingTag,
    pantryMatch: 'uses_pantry',
    allergyWarnings: template.allergyWarnings.length > 0 ? template.allergyWarnings : undefined,
    ingredients,
    steps: generateSteps(template.steps),
    proTips: generateProTips(template.title),
    createdAt: Date.now(),
  };

  return recipe;
}

/**
 * Generate alternative recipes
 */
export async function generateAlternatives(
  _original: Recipe,
  count: number = 2,
): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const alternatives: Recipe[] = [];

  for (let i = 0; i < Math.min(count, RECIPE_TEMPLATES.length - 1); i++) {
    const template = RECIPE_TEMPLATES[(i + 1) % RECIPE_TEMPLATES.length];

    alternatives.push({
      id: generateId(),
      title: template.title,
      nutrition: { ...template.baseNutrition, verified: false },
      timingTag: template.timingTag,
      pantryMatch: 'uses_pantry',
      allergyWarnings: template.allergyWarnings.length > 0 ? template.allergyWarnings : undefined,
      ingredients: template.baseIngredients.map((name) => ({ name })),
      steps: generateSteps(template.steps),
      proTips: generateProTips(template.title),
      createdAt: Date.now(),
    });
  }

  return alternatives;
}

/**
 * Refine an existing recipe
 */
export async function refineRecipe(input: RefineRecipeInput): Promise<Recipe> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  // For now, generate a new recipe
  // In production, this would modify the existing recipe based on the action
  const template = RECIPE_TEMPLATES[Math.floor(Math.random() * RECIPE_TEMPLATES.length)];

  const recipe: Recipe = {
    id: generateId(),
    title: `${input.action === 'boost_protein' ? 'High-Protein ' : ''}${template.title}`,
    nutrition: {
      ...template.baseNutrition,
      protein_g:
        input.action === 'boost_protein'
          ? Math.round(template.baseNutrition.protein_g * 1.5)
          : template.baseNutrition.protein_g,
      verified: false,
    },
    timingTag: template.timingTag,
    pantryMatch: 'uses_pantry',
    allergyWarnings: template.allergyWarnings.length > 0 ? template.allergyWarnings : undefined,
    ingredients: template.baseIngredients.map((name) => ({ name })),
    steps: generateSteps(template.steps),
    proTips: generateProTips(template.title),
    createdAt: Date.now(),
  };

  return recipe;
}
