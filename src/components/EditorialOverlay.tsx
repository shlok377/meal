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
  const burgerDetail = config.presetDetails.burger;
  const friesDetail = config.presetDetails.fries;

  return (
    <div className="absolute inset-0 w-full h-full min-h-screen flex flex-col justify-between pointer-events-none select-none overflow-hidden p-6 md:p-12 z-20">
      
      {/* 1. TOP HEADER BAR */}
      <header className="w-full flex items-center justify-between pointer-events-auto">
        {/* Left Category with minimalist rule line */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs md:text-sm font-semibold tracking-[0.25em] uppercase text-neutral-800 dark:text-neutral-200">
              {config.categoryLeft}
            </span>
          </div>
          <div className="h-[1.5px] w-24 md:w-36 bg-neutral-900/30 dark:bg-neutral-100/30 mt-1"></div>
        </div>

        {/* Center/Right: Right Category & Theme Mode Switcher */}
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

      {/* 2. UPPER HERO SECTION: SEPARATED FRIES (LEFT) & BURGER (RIGHT) EDITORIAL CALLOUTS */}
      <div className="w-full flex items-start justify-between gap-4 pointer-events-none mt-4 md:mt-6">
        
        {/* UPPER LEFT: FRIES INFORMATION */}
        <motion.div
          animate={{
            scale: preset === 'fries' ? 1.02 : 1.0,
            opacity: preset === 'burger' ? 0.45 : 1.0,
          }}
          transition={{ duration: 0.3 }}
          onClick={() => onSelectPreset('fries')}
          className={`group max-w-[280px] sm:max-w-xs p-4 rounded-2xl border transition-all duration-300 pointer-events-auto cursor-pointer ${
            preset === 'fries'
              ? 'bg-white/95 dark:bg-neutral-900/95 border-amber-500 shadow-xl ring-2 ring-amber-500/20'
              : 'bg-white/70 dark:bg-neutral-900/70 border-neutral-900/10 dark:border-neutral-100/10 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </span>
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-400">
              {friesDetail.tag}
            </span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {friesDetail.headline}
          </h3>

          <p className="font-sans text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mt-1 line-clamp-3 group-hover:line-clamp-none transition-all">
            {friesDetail.description}
          </p>

          <div className="mt-2.5 inline-block text-[10px] font-sans font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {friesDetail.badge}
          </div>
        </motion.div>

        {/* UPPER RIGHT: BURGER INFORMATION */}
        <motion.div
          animate={{
            scale: preset === 'burger' ? 1.02 : 1.0,
            opacity: preset === 'fries' ? 0.45 : 1.0,
          }}
          transition={{ duration: 0.3 }}
          onClick={() => onSelectPreset('burger')}
          className={`group max-w-[280px] sm:max-w-xs p-4 rounded-2xl border transition-all duration-300 pointer-events-auto cursor-pointer text-right flex flex-col items-end ${
            preset === 'burger'
              ? 'bg-white/95 dark:bg-neutral-900/95 border-amber-500 shadow-xl ring-2 ring-amber-500/20'
              : 'bg-white/70 dark:bg-neutral-900/70 border-neutral-900/10 dark:border-neutral-100/10 hover:bg-white/90 dark:hover:bg-neutral-900/90 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-amber-700 dark:text-amber-400">
              {burgerDetail.tag}
            </span>
            <span className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Layers className="w-3.5 h-3.5" />
            </span>
          </div>

          <h3 className="font-serif text-sm sm:text-base font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
            {burgerDetail.headline}
          </h3>

          <p className="font-sans text-[11px] leading-relaxed text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mt-1 line-clamp-3 group-hover:line-clamp-none transition-all">
            {burgerDetail.description}
          </p>

          <div className="mt-2.5 inline-block text-[10px] font-sans font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {burgerDetail.badge}
          </div>
        </motion.div>

      </div>

      {/* 3. BOTTOM SECTION: VIEW SWITCHER + FOOTER DETAILS */}
      <div className="w-full flex flex-col gap-6 pointer-events-none pb-2 mt-auto">
        
        {/* VIEW SWITCHER PILLS (Centered at bottom) */}
        <div className="w-full flex justify-center pointer-events-auto">
          <div className="flex items-center gap-1.5 p-1.5 rounded-full border border-neutral-900/15 dark:border-neutral-100/15 bg-white/85 dark:bg-neutral-900/90 shadow-xl pointer-events-auto">
            {PRESET_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isActive = preset === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectPreset(item.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer pointer-events-auto ${
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

        {/* FOOTER BAR: Left Price/Signature + Right Narrative Copy & Order CTA */}
        <footer className="w-full flex flex-col md:flex-row items-end justify-between gap-6 pointer-events-auto">
          
          {/* Bottom Left: Price & Brand Signature */}
          <div className="flex flex-col items-start space-y-1 pointer-events-auto">
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
          <div className="hidden xl:flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-500/80 dark:text-neutral-400/70 pointer-events-none mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Drag 3D meal 360°</span>
          </div>

          {/* Bottom Right: Narrative Copy & Order CTA */}
          <div className="flex flex-col items-start md:items-end max-w-sm md:max-w-md text-left md:text-right space-y-3 pointer-events-auto">
            <p className="font-sans text-[11px] md:text-xs font-medium tracking-[0.14em] uppercase leading-relaxed text-neutral-700 dark:text-neutral-300">
              {config.narrativeCopy}
            </p>

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

    </div>
  );
};
