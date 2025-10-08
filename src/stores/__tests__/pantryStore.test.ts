/**
 * Pantry Store Tests
 */

import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePantryStore } from '../pantryStore';
import type { PantryItem } from '../../types/models';

jest.mock('@react-native-async-storage/async-storage');

describe('pantryStore', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
    (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
    (AsyncStorage.removeItem as jest.Mock).mockResolvedValue(undefined);

    // Clear store state between tests
    await act(async () => {
      usePantryStore.setState({ items: [], isLoading: false });
    });
  });

  describe('loadItems', () => {
    it('should load pantry items from storage', async () => {
      const mockItems: PantryItem[] = [
        {
          id: '1',
          name: 'Chicken',
          category: 'Meat & Poultry',
          source: 'manual',
          valid: true,
          addedAt: Date.now(),
        },
      ];

      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

      const { result } = renderHook(() => usePantryStore());

      await act(async () => {
        await result.current.loadItems();
      });

      expect(result.current.items).toEqual(mockItems);
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle empty storage', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

      const { result } = renderHook(() => usePantryStore());

      await act(async () => {
        await result.current.loadItems();
      });

      expect(result.current.items).toEqual([]);
    });
  });

  describe('addItem', () => {
    it('should add a new item to pantry', async () => {
      const { result } = renderHook(() => usePantryStore());

      const newItem = {
        name: 'Tomatoes',
        category: 'Vegetables',
        quantity: '5',
        source: 'manual' as const,
        valid: true,
      };

      await act(async () => {
        await result.current.addItem(newItem);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0]).toMatchObject(newItem);
      expect(result.current.items[0].id).toBeDefined();
      expect(result.current.items[0].addedAt).toBeDefined();
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('updateItem', () => {
    it('should update an existing item', async () => {
      const { result } = renderHook(() => usePantryStore());

      // Add an item first
      await act(async () => {
        await result.current.addItem({
          name: 'Chicken',
          source: 'manual',
          valid: true,
        });
      });

      const itemId = result.current.items[0].id;

      // Update the item
      await act(async () => {
        await result.current.updateItem(itemId, {
          name: 'Chicken Breast',
          quantity: '500g',
        });
      });

      expect(result.current.items[0].name).toBe('Chicken Breast');
      expect(result.current.items[0].quantity).toBe('500g');
    });
  });

  describe('removeItem', () => {
    it('should remove an item from pantry', async () => {
      const { result } = renderHook(() => usePantryStore());

      // Add an item first
      await act(async () => {
        await result.current.addItem({
          name: 'Chicken',
          source: 'manual',
          valid: true,
        });
      });

      const itemId = result.current.items[0].id;

      // Remove the item
      await act(async () => {
        await result.current.removeItem(itemId);
      });

      expect(result.current.items).toHaveLength(0);
    });
  });

  describe('quickAddStaples', () => {
    it('should add common staple items', async () => {
      const { result } = renderHook(() => usePantryStore());

      await act(async () => {
        await result.current.quickAddStaples();
      });

      expect(result.current.items.length).toBeGreaterThan(0);
      expect(result.current.items.some((item) => item.name === 'Olive Oil')).toBe(true);
      expect(result.current.items.some((item) => item.name === 'Salt')).toBe(true);
    });
  });

  describe('clearAll', () => {
    it('should remove all items', async () => {
      const { result } = renderHook(() => usePantryStore());

      // Add some items first
      await act(async () => {
        await result.current.addItem({ name: 'Item 1', source: 'manual', valid: true });
        await result.current.addItem({ name: 'Item 2', source: 'manual', valid: true });
      });

      expect(result.current.items).toHaveLength(2);

      // Clear all
      await act(async () => {
        await result.current.clearAll();
      });

      expect(result.current.items).toHaveLength(0);
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@kitchengenie:pantry_items');
    });
  });
});
