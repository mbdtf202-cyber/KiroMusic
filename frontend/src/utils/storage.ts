/**
 * Local Storage Utilities
 */

import { STORAGE_KEYS } from './constants';

export const storage = {
  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  },

  // Specific helpers
  getTheme(): 'light' | 'dark' {
    return (this.get(STORAGE_KEYS.THEME) as 'light' | 'dark') || 'light';
  },

  setTheme(theme: 'light' | 'dark'): void {
    this.set(STORAGE_KEYS.THEME, theme);
  },

  getFavorites(): string[] {
    return (this.get(STORAGE_KEYS.FAVORITES) as string[]) || [];
  },

  addFavorite(id: string): void {
    const favorites = this.getFavorites();
    if (!favorites.includes(id)) {
      this.set(STORAGE_KEYS.FAVORITES, [...favorites, id]);
    }
  },

  removeFavorite(id: string): void {
    const favorites = this.getFavorites();
    this.set(STORAGE_KEYS.FAVORITES, favorites.filter(f => f !== id));
  },

  isFavorite(id: string): boolean {
    return this.getFavorites().includes(id);
  },
};
