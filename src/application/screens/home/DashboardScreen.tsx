import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../theme';
import t from '../../../i18n';
import { useRecipeStore } from '../../../stores/recipeStore';
import { usePantryStore } from '../../../stores/pantryStore';
import { useUserStore } from '../../../stores/userStore';
import RecipeCard from '../../../components/cards/RecipeCard';
import StatsCard from '../../../components/cards/StatsCard';
import EmptyState from '../../../components/layout/EmptyState';
import type { Recipe } from '../../../types/models';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { recentRecipes, savedRecipes, loadRecentRecipes, setCurrentRecipe } = useRecipeStore();
  const { items: pantryItems } = usePantryStore();
  const { profile } = useUserStore();

  useEffect(() => {
    loadRecentRecipes();
  }, []);

  const userName = profile?.name || 'Chef';
  const greeting = getGreeting();

  const handleRecipePress = (recipe: Recipe) => {
    setCurrentRecipe(recipe);
    navigation.navigate('RecipeDetail' as never);
  };

  const quickActions = [
    {
      title: t('home.generateRecipe'),
      icon: 'restaurant' as const,
      color: theme.colors.primary,
      onPress: () => navigation.navigate('RecipeGeneration' as never),
    },
    {
      title: t('home.managePantry'),
      icon: 'basket' as const,
      color: theme.colors.secondary,
      onPress: () => navigation.navigate('Pantry' as never),
    },
    {
      title: t('home.exploreCommunity'),
      icon: 'people' as const,
      color: theme.colors.info,
      onPress: () => navigation.navigate('Community' as never),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Personalized Greeting */}
        <Text style={styles.greeting}>
          {greeting}, {userName}!
        </Text>
        <Text style={styles.subtitle}>What would you like to cook today?</Text>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard
            icon="restaurant"
            label="Recipes"
            value={recentRecipes.length}
            color={theme.colors.primary}
          />
          <StatsCard
            icon="heart"
            label="Saved"
            value={savedRecipes.length}
            color={theme.colors.error}
          />
        </View>
        <View style={styles.statsContainer}>
          <StatsCard
            icon="basket"
            label="Pantry Items"
            value={pantryItems.length}
            color={theme.colors.secondary}
          />
          <StatsCard icon="flame" label="Cooked" value={0} color={theme.colors.warning} />
        </View>

        {/* Recent Recipes Carousel */}
        {recentRecipes.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Recipes</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Saved' as never)}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
              {recentRecipes.slice(0, 5).map((recipe) => (
                <View key={recipe.id} style={styles.carouselItem}>
                  <RecipeCard recipe={recipe} onPress={() => handleRecipePress(recipe)} compact />
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { borderColor: action.color }]}
                onPress={action.onPress}
              >
                <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={32} color={theme.colors.white} />
                </View>
                <Text style={styles.actionTitle}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Empty State */}
        {recentRecipes.length === 0 && (
          <EmptyState
            icon="restaurant-outline"
            title="No Recipes Yet"
            description="Start by generating your first recipe from your pantry items!"
            actionText="Generate Recipe"
            onAction={() => navigation.navigate('RecipeGeneration' as never)}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function for time-based greeting
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  greeting: {
    fontSize: theme.typography.sizes.xxxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  sectionContainer: {
    marginVertical: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  carousel: {
    marginHorizontal: -theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  carouselItem: {
    width: 280,
    marginRight: theme.spacing.md,
  },
  quickActionsContainer: {
    marginVertical: theme.spacing.lg,
  },
  actionsGrid: {
    gap: theme.spacing.md,
  },
  actionCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    ...theme.shadows.md,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: {
    flex: 1,
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
  },
});
