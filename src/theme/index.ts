/**
 * KitchenGenie Theme Configuration
 * Design tokens for colors, typography, spacing, and more
 */

export const colors = {
  // Primary palette
  primary: '#FF6B35',
  primaryDark: '#E85A2D',
  primaryLight: '#FF8A5C',
  
  // Secondary palette
  secondary: '#4ECDC4',
  secondaryDark: '#3DB5AD',
  secondaryLight: '#6ED9D1',
  
  // Neutrals
  background: '#FFFFFF',
  surface: '#F7F9FC',
  surfaceDark: '#E8ECF1',
  text: '#1A1A1A',
  textSecondary: '#6B7280',
  textLight: '#9CA3AF',
  border: '#E5E7EB',
  
  // Semantic colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Nutrition colors (for macros)
  protein: '#8B5CF6',
  carbs: '#F59E0B',
  fat: '#EC4899',
  
  // Special
  overlay: 'rgba(0, 0, 0, 0.5)',
  disabled: '#D1D5DB',
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const layout = {
  minTouchTarget: 44,
  maxContentWidth: 600,
  tabBarHeight: 60,
  headerHeight: 56,
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  layout,
};

export type Theme = typeof theme;

export default theme;
