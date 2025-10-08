/**
 * Pantry Store
 * Manages pantry items with persistence
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PantryItem } from '../types/models';
import { generateId } from '../utils/formatters';
import { STORAGE_KEYS, QUICK_ADD_STAPLES } from '../utils/constants';

interface PantryState {
  items: PantryItem[];
  isLoading: boolean;

  // Actions
  loadItems: () => Promise<void>;
  addItem: (item: Omit<PantryItem, 'id' | 'addedAt'>) => Promise<void>;
  updateItem: (id: string, updates: Partial<PantryItem>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  quickAddStaples: () => Promise<void>;
  clearAll: () => Promise<void>;
}

export const usePantryStore = create<PantryState>((set, get) => ({
  items: [],
  isLoading: false,

  loadItems: async () => {
    set({ isLoading: true });
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.PANTRY_ITEMS);
      const items = stored ? JSON.parse(stored) : [];
      set({ items, isLoading: false });
    } catch (error) {
      console.error('Failed to load pantry items:', error);
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    const newItem: PantryItem = {
      ...item,
      id: generateId(),
      addedAt: Date.now(),
    };

    const items = [...get().items, newItem];
    set({ items });

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PANTRY_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save pantry item:', error);
    }
  },

  updateItem: async (id, updates) => {
    const items = get().items.map((item) => (item.id === id ? { ...item, ...updates } : item));
    set({ items });

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PANTRY_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to update pantry item:', error);
    }
  },

  removeItem: async (id) => {
    const items = get().items.filter((item) => item.id !== id);
    set({ items });

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PANTRY_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to remove pantry item:', error);
    }
  },

  quickAddStaples: async () => {
    const existingNames = new Set(get().items.map((item) => item.name.toLowerCase()));
    const newStaples = QUICK_ADD_STAPLES.filter(
      (staple) => !existingNames.has(staple.name.toLowerCase()),
    );

    const newItems = newStaples.map(
      (staple): PantryItem => ({
        id: generateId(),
        name: staple.name,
        category: staple.category,
        source: 'manual',
        valid: true,
        addedAt: Date.now(),
      }),
    );

    const items = [...get().items, ...newItems];
    set({ items });

    try {
      await AsyncStorage.setItem(STORAGE_KEYS.PANTRY_ITEMS, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to add staples:', error);
    }
  },

  clearAll: async () => {
    set({ items: [] });
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.PANTRY_ITEMS);
    } catch (error) {
      console.error('Failed to clear pantry:', error);
    }
  },
}));
