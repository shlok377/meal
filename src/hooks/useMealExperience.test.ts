import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMealExperience } from './useMealExperience';

describe('useMealExperience', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default light theme, combo preset, and closed order modal', () => {
    const { result } = renderHook(() => useMealExperience());
    expect(result.current.theme).toBe('light');
    expect(result.current.preset).toBe('combo');
    expect(result.current.isOrderOpen).toBe(false);
  });

  it('toggles theme between light and dark and updates localStorage', () => {
    const { result } = renderHook(() => useMealExperience());

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('meal_theme_preference')).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('meal_theme_preference')).toBe('light');
  });

  it('updates camera preset correctly', () => {
    const { result } = renderHook(() => useMealExperience());

    act(() => {
      result.current.setPreset('burger');
    });
    expect(result.current.preset).toBe('burger');

    act(() => {
      result.current.setPreset('fries');
    });
    expect(result.current.preset).toBe('fries');
  });

  it('opens and closes order modal', () => {
    const { result } = renderHook(() => useMealExperience());

    act(() => {
      result.current.openOrder();
    });
    expect(result.current.isOrderOpen).toBe(true);

    act(() => {
      result.current.closeOrder();
    });
    expect(result.current.isOrderOpen).toBe(false);
  });
});
