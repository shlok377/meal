import React from 'react';
import { Sun, Moon, Sparkles, Layers, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ThemeMode, CameraPreset, MealConfig } from '../types';

interface EditorialOverlayProps {
  config: MealConfig;
  theme: ThemeMode;
  preset: CameraPreset;
  onToggleTheme: () => void;
  onSelectPreset: (preset: CameraPreset) => void;
  onOpenOrder: () => void;
}

const PRESET_OPTIONS: Array<{
  id: CameraPreset;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { id: 'combo', label: 'Full Combo', icon: Sparkles },
  { id: 'burger', label: 'Focus Burger', icon: Layers },
  { id: 'fries', label: 'Focus Fries', icon: UtensilsCrossed },
];

export const EditorialOverlay: React.FC<EditorialOverlayProps> = ({
  config,
  theme,
  preset,
  onToggleTheme,
  onSelectPreset,
  onOpenOrder,
}) => {
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full h-full min-h-screen flex flex-col justify-between pointer-events-none select-none overflow-hidden p-6 md:p-12 z-10">
      
      {/* 1. TOP HEADER SECTION */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left Category with minimalist line */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-800 dark:text-neutral-200">
              {config.categoryLeft}
            </span>
          </div>
          <div className="h-[1.5px] w-24 md:w-36 bg-neutral-900/30 dark:bg-neutral-100/30 mt-1"></div>
        </div>

        {/* Center/Right: Theme Mode Switcher & Right Category */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-800 dark:text-neutral-200">
              {config.categoryRight}
            </span>
            <div className="h-[1.5px] w-16 md:w-24 bg-neutral-900/30 dark:bg-neutral-100/30 mt-1"></div>
          </div>

          {/* Theme Toggle Pill */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800/20 dark:border-neutral-200/20 bg-white/40 dark:bg-neutral-900/50 backdrop-blur-md hover:bg-white/70 dark:hover:bg-neutral-800/80 transition-all duration-300 shadow-sm cursor-pointer"
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-200">Smokehouse Grill</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-600/20" />
                <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-800">Artisan Diner</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. REPEATING LUXURY STACKED DISPLAY TYPOGRAPHY (Layered behind 3D meal) */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10 leading-[0.88] opacity-90 dark:opacity-85"
      >
        <div className="w-full text-center flex flex-col items-center justify-center space-y-[-1vw] md:space-y-[-1.5vw] translate-y-[-2vh]">
          <h1 className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/80 dark:text-neutral-100/75 uppercase drop-shadow-sm">
            {config.title}
          </h1>
          <div className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/55 dark:text-neutral-100/40 uppercase">
            {config.title}
          </div>
          <div className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/35 dark:text-neutral-100/20 uppercase">
            {config.title}
          </div>
          <div className="hidden lg:block font-serif font-black tracking-[-0.04em] text-[11.5vw] text-neutral-900/15 dark:text-neutral-100/10 uppercase">
            {config.title}
          </div>
        </div>
      </div>

      {/* 3. CENTER FLOATING CAMERA PRESET PILLS */}
      <div className="w-full flex justify-center pointer-events-auto my-auto pt-44 md:pt-64">
        <div className="flex items-center gap-1.5 p-1 rounded-full border border-neutral-900/10 dark:border-neutral-100/10 bg-neutral-900/5 dark:bg-neutral-100/5 backdrop-blur-md shadow-lg">
          {PRESET_OPTIONS.map((item) => {
            const Icon = item.icon;
            const isActive = preset === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPreset(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-md'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. FOOTER / EDITORIAL DETAILS SECTION */}
      <footer className="w-full flex flex-col md:flex-row items-end md:items-end justify-between gap-6 pointer-events-auto pb-2">
        
        {/* Bottom Left: Price & Brand Signature */}
        <div className="flex flex-col items-start space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-xs tracking-[0.2em] font-semibold text-neutral-600 dark:text-neutral-400 uppercase">
              ONLY
            </span>
            <span className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              @ {config.priceCurrency}{config.priceAmount}
            </span>
          </div>
          
          {/* Cursive handwritten signature */}
          <div className="font-script text-3xl md:text-4xl text-neutral-800/90 dark:text-neutral-200/90 rotate-[-2deg] tracking-wide pt-1">
            {config.signature}
          </div>
        </div>

        {/* Bottom Center / Drag Hint */}
        <div className="hidden lg:flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-500/80 dark:text-neutral-400/70">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>Drag to rotate 360°</span>
        </div>

        {/* Bottom Right: Narrative Copy & Order Button */}
        <div className="flex flex-col items-start md:items-end max-w-sm md:max-w-md text-left md:text-right space-y-4">
          <p className="font-sans text-[11px] md:text-xs font-medium tracking-[0.14em] uppercase leading-relaxed text-neutral-700 dark:text-neutral-300">
            {config.narrativeCopy}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOrder}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer"
          >
            <span>Order Combo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>
      </footer>

    </div>
  );
};
