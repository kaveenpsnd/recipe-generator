/**
 * i18n helper functions
 * Simple translation system with support for interpolation
 */

import translations from './en.json';

/**
 * Get translation by key with optional interpolation
 * @param key - Translation key (e.g., "auth.login")
 * @param params - Optional parameters for interpolation
 */
export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
