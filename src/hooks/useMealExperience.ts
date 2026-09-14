import { useState, useEffect, useCallback } from 'react';
import { ThemeMode, CameraPreset } from '../types';

const THEME_STORAGE_KEY = 'meal_theme_preference';

export function useMealExperience() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [preset, setPreset] = useState<CameraPreset>('combo');
  const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch {
      // ignore storage errors in private mode/sandboxes
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const openOrder = useCallback(() => setIsOrderOpen(true), []);
  const closeOrder = useCallback(() => setIsOrderOpen(false), []);

  return {
    theme,
    toggleTheme,
    preset,
    setPreset,
    isOrderOpen,
    openOrder,
    closeOrder,
  };
}
