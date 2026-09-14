export type ThemeMode = 'light' | 'dark';

export type CameraPreset = 'combo' | 'burger' | 'fries';

export interface Ingredient {
  name: string;
  description: string;
  icon: string;
}

export interface MacroNutrient {
  label: string;
  value: string;
}

export interface PresetDetail {
  tag: string;
  headline: string;
  description: string;
  badge: string;
}

export interface MealConfig {
  title: string;
  subtitle: string;
  categoryLeft: string;
  categoryRight: string;
  priceFormatted: string;
  priceCurrency: string;
  priceAmount: number;
  signature: string;
  narrativeCopy: string;
  presetDetails: Record<CameraPreset, PresetDetail>;
  ingredients: Ingredient[];
  macros: MacroNutrient[];
}
