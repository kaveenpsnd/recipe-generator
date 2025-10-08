/**
 * i18n helper functions
 * Simple translation system with support for interpolation
 */

import translations from './en.json';

type TranslationKeys = typeof translations;
type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

/**
 * Get translation by key with optional interpolation
 * @param key - Translation key (e.g., "auth.login")
 * @param params - Optional parameters for interpolation
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value[k];
    if (value === undefined) {
      return key; // Return key if translation not found
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Simple interpolation
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_, paramKey) => {
      return params[paramKey]?.toString() || '';
    });
  }

  return value;
}

export default t;
