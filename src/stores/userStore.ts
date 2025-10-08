/**
 * User Store
 * Manages user profile and preferences
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  preferences?: {
    dietaryRestrictions?: string[];
    goals?: string[];
    allergens?: string[];
  };
}

interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;

  // Actions
  loadProfile: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  setProfile: (profile: UserProfile | null) => void;
  clearProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  isLoading: false,

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      const profile = stored ? JSON.parse(stored) : null;
      set({ profile, isLoading: false });
    } catch (error) {
      console.error('Failed to load user profile:', error);
      set({ isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const currentProfile = get().profile;
    if (!currentProfile) return;

    const updatedProfile = { ...currentProfile, ...updates };
    set({ profile: updatedProfile });
    await AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updatedProfile));
  },

  setProfile: (profile: UserProfile | null) => {
    set({ profile });
    if (profile) {
      AsyncStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  },

  clearProfile: async () => {
    set({ profile: null });
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
  },
}));
