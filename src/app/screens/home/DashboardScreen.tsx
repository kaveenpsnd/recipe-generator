import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../../../theme';
import t from '../../../i18n';

export default function DashboardScreen() {
  const navigation = useNavigation();

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
        <Text style={styles.greeting}>{t('home.greeting', { name: 'Chef' })}</Text>
        <Text style={styles.subtitle}>What would you like to cook today?</Text>

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
      </ScrollView>
    </SafeAreaView>
  );
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
  quickActionsContainer: {
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.typography.sizes.xl,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
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
