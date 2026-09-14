import { MealConfig } from '../types';

export const mealData: MealConfig = {
  title: "SMASH BURGER",
  subtitle: "DOUBLE LAYER ARTISAN COMBO",
  categoryLeft: "AMERICAN CLASSIC",
  categoryRight: "GOURMET EDITION",
  priceFormatted: "ONLY @ ₹349",
  priceCurrency: "₹",
  priceAmount: 349,
  signature: "Flavour trails",
  narrativeCopy: "THIS ARTISAN MEAL OFFERS A PERFECT HARMONY OF JUICY SMASHED PATTIES, CRISPY GOLDEN FRIES, & SIGNATURE DIP.",
  presetDetails: {
    combo: {
      tag: "GOURMET COMBO",
      headline: "THE ARTISAN MEAL EXPERIENCE",
      description: "THIS ARTISAN MEAL OFFERS A PERFECT HARMONY OF JUICY SMASHED PATTIES, CRISPY GOLDEN FRIES, & SIGNATURE DIP.",
      badge: "Full Combo • 780 kcal • 48g Protein",
    },
    burger: {
      tag: "THE HERO",
      headline: "DOUBLE SMASHED ANGUS BURGER",
      description: "TWO 100% PRIME ANGUS BEEF PATTIES SEARED WITH CRISPY LACY EDGES, DOUBLE MELTED WISCONSIN CHEDDAR, FRESH CRISP LETTUCE, RIPE TOMATOES & TOASTED POTATO BRIOCHE.",
      badge: "100% Prime Angus Beef • Double Melted Cheddar",
    },
    fries: {
      tag: "SIDES & DIP",
      headline: "CRISPY GOLDEN FRIES & KETCHUP",
      description: "DOUBLE-FRIED IDAHO RUSSET POTATOES CRISPED TO GOLDEN PERFECTION, TOSSED IN SMOKED SEA SALT & SERVED WITH VINTAGE BOTTLING KETCHUP.",
      badge: "Double Fried • Smoked Sea Salt Rub",
    },
  },
  ingredients: [
    {
      name: "Double Angus Smashed Patties",
      description: "100% prime Angus beef with seared crispy lacy edges and maximum juiciness.",
      icon: "Flame"
    },
    {
      name: "Melted Wisconsin Cheddar",
      description: "Dual-melted aged sharp cheddar cheese coating every layer.",
      icon: "Sparkles"
    },
    {
      name: "Butter-Toasted Brioche Bun",
      description: "Lightly toasted artisanal potato brioche bun with sesame finish.",
      icon: "Layers"
    },
    {
      name: "Hand-Cut Golden Fries",
      description: "Double-fried Idaho potatoes tossed in smoked sea salt and herb rub.",
      icon: "Utensils"
    },
    {
      name: "House Secret Sauce",
      description: "Creamy smoked paprika, sweet relish, and roasted garlic aioli.",
      icon: "Droplets"
    }
  ],
  macros: [
    { label: "Calories", value: "780 kcal" },
    { label: "Protein", value: "48g" },
    { label: "Carbs", value: "54g" },
    { label: "Fats", value: "38g" }
  ]
};
