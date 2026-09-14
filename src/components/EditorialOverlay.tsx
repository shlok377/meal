import React from 'react';
import { Sun, Moon, Sparkles, Layers, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const burgerDetail = config.presetDetails.burger;
  const friesDetail = config.presetDetails.fries;
  const comboDetail = config.presetDetails.combo;

  return (
    <div className="absolute inset-0 w-full h-full min-h-screen pointer-events-none select-none overflow-hidden z-20">
      
      {/* 1. TOP HEADER (Anchored firmly at top) */}
      <header className="absolute top-0 inset-x-0 w-full flex items-center justify-between p-6 md:p-12 pointer-events-auto z-20">
        {/* Left Category with minimalist line */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-800 dark:text-neutral-200">
              {config.categoryLeft}
            </span>
          </div>
          <div className="h-[1.5px] w-24 md:w-36 bg-neutral-900/30 dark:bg-neutral-100/30 mt-1"></div>
        </div>

        {/* Right Category & Theme Mode Switcher */}
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
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800/20 dark:border-neutral-200/20 bg-white/80 dark:bg-neutral-900/85 hover:bg-white/95 dark:hover:bg-neutral-800 transition-all duration-300 shadow-md cursor-pointer pointer-events-auto"
          >
            {isDark ? (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-200 font-medium">Smokehouse Grill</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-600 fill-amber-600/20" />
                <span className="text-[11px] font-sans uppercase tracking-widest text-neutral-800 font-medium">Artisan Diner</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 2. UPPER-HALF SEPARATED INFO PANELS (Near the halfway line, left and right) */}

      {/* Left Side Panel: Fries Info (Only visible when Focus Fries is active) */}
      <div className="absolute left-6 md:left-12 lg:left-16 top-[38%] md:top-[40%] -translate-y-1/2 max-w-xs md:max-w-sm pointer-events-none z-20">
        <AnimatePresence>
          {preset === 'fries' && (
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-3 pointer-events-auto p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/85 border border-neutral-900/10 dark:border-neutral-100/10 shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-400 text-[10px] font-sans font-bold tracking-wider uppercase">
                <UtensilsCrossed className="w-3 h-3" />
                <span>{friesDetail.tag}</span>
              </div>

              <h2 className="font-serif text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight leading-snug">
                {friesDetail.headline}
              </h2>

              <p className="font-sans text-[11px] md:text-xs font-medium tracking-[0.1em] uppercase leading-relaxed text-neutral-700 dark:text-neutral-300">
                {friesDetail.description}
              </p>

              <div className="text-[10px] font-sans font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 pt-1">
                {friesDetail.badge}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Side Panel: Burger Info (Only visible when Focus Burger is active) */}
      <div className="absolute right-6 md:right-12 lg:right-16 top-[38%] md:top-[40%] -translate-y-1/2 max-w-xs md:max-w-sm text-right pointer-events-none z-20">
        <AnimatePresence>
          {preset === 'burger' && (
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="space-y-3 pointer-events-auto p-5 rounded-2xl bg-white/80 dark:bg-neutral-900/85 border border-neutral-900/10 dark:border-neutral-100/10 shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-400 text-[10px] font-sans font-bold tracking-wider uppercase">
                <Layers className="w-3 h-3" />
                <span>{burgerDetail.tag}</span>
              </div>

              <h2 className="font-serif text-lg md:text-xl font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight leading-snug">
                {burgerDetail.headline}
              </h2>

              <p className="font-sans text-[11px] md:text-xs font-medium tracking-[0.1em] uppercase leading-relaxed text-neutral-700 dark:text-neutral-300">
                {burgerDetail.description}
              </p>

              <div className="text-[10px] font-sans font-semibold tracking-wider uppercase text-amber-600 dark:text-amber-400 pt-1">
                {burgerDetail.badge}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. BOTTOM FOOTER SECTION (Anchored firmly at the bottom of the page) */}
      <footer className="absolute bottom-0 inset-x-0 w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-6 p-6 md:p-12 pb-6 md:pb-8 pointer-events-none z-20">
        
        {/* Bottom Left: Price & Brand Signature */}
        <div className="flex flex-col items-start space-y-1 pointer-events-auto self-start md:self-end">
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

        {/* Bottom Center: Focus Selector (At the very extreme bottom) */}
        <div className="pointer-events-auto pb-1">
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-neutral-900/15 dark:border-neutral-100/15 bg-white/90 dark:bg-neutral-900/90 shadow-2xl">
            {PRESET_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = preset === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectPreset(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-md scale-105'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Right: Narrative Copy & Order Button */}
        <div className="flex flex-col items-start md:items-end max-w-xs md:max-w-sm text-left md:text-right space-y-3 pointer-events-auto self-end">
          {preset === 'combo' && (
            <p className="font-sans text-[11px] md:text-xs font-medium tracking-[0.14em] uppercase leading-relaxed text-neutral-700 dark:text-neutral-300">
              {comboDetail.description}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenOrder}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer pointer-events-auto"
          >
            <span>Order Combo</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

      </footer>

    </div>
  );
};
