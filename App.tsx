import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/application/navigation/RootNavigator';
import { usePantryStore } from './src/stores/pantryStore';
import { useRecipeStore } from './src/stores/recipeStore';
import { useUserStore } from './src/stores/userStore';

export default function App() {
  const loadPantryItems = usePantryStore((state) => state.loadItems);
  const loadRecentRecipes = useRecipeStore((state) => state.loadRecentRecipes);
  const { loadProfile, setProfile } = useUserStore();

  useEffect(() => {
    // Initialize stores on app start
    const initializeApp = async () => {
      await loadPantryItems();
      await loadRecentRecipes();
      await loadProfile();

      // Set a temporary user profile if none exists (until Firebase auth is implemented)
      const profile = useUserStore.getState().profile;
      if (!profile) {
        setProfile({
          id: 'temp-user',
          name: 'Chef',
          email: 'chef@kitchengenie.com',
        });
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
