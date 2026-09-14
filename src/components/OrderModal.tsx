import React, { useState, useEffect } from 'react';
import { X, Flame, Sparkles, Layers, Utensils, Droplets, CheckCircle, ShoppingBag, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MealConfig, ThemeMode } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: MealConfig;
  theme: ThemeMode;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Flame,
  Sparkles,
  Layers,
  Utensils,
  Droplets,
};

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  config,
  theme,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setIsOrdered(false);
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#EF4444', '#10B981', '#FBBF24'],
    });
  };

  const totalPrice = config.priceAmount * quantity;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 transform scale-100 ${
          theme === 'dark'
            ? 'bg-[#18181E] border-neutral-800 text-neutral-100'
            : 'bg-[#FAF7F0] border-neutral-300 text-neutral-900'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close order modal"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-500/10 transition-colors text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isOrdered ? (
          <div className="space-y-6">
            {/* Header Title */}
            <div>
              <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold tracking-widest uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{config.categoryRight}</span>
              </div>
              <h2 id="modal-title" className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                {config.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {config.subtitle}
              </p>
            </div>

            {/* Nutritional Macros */}
            <div className="grid grid-cols-4 gap-2 py-3 px-4 rounded-2xl bg-neutral-500/5 dark:bg-neutral-100/5 border border-neutral-500/10">
              {config.macros.map((macro, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-[10px] sm:text-xs font-sans uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {macro.label}
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-sans mt-0.5">
                    {macro.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Ingredients Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-sans font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
                What's in the Box
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {config.ingredients.map((item, idx) => {
                  const IconComponent = ICON_MAP[item.icon] || Sparkles;
                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-neutral-500/5 dark:bg-neutral-100/5 hover:bg-neutral-500/10 transition-colors"
                    >
                      <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold font-sans">{item.name}</h4>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Price */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-500/15">
              <div className="flex items-center gap-3 bg-neutral-500/10 dark:bg-neutral-100/10 p-1.5 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-1.5 rounded-full hover:bg-neutral-500/20 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-sans font-bold text-sm w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                  className="p-1.5 rounded-full hover:bg-neutral-500/20 text-neutral-700 dark:text-neutral-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="text-right">
                <div className="text-[11px] uppercase tracking-wider text-neutral-500 dark:text-neutral-400">Total</div>
                <div className="font-serif text-2xl font-black text-neutral-900 dark:text-neutral-100">
                  {config.priceCurrency}{totalPrice}
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-neutral-950 font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-lg hover:shadow-amber-500/25 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Confirm Order</span>
            </button>
          </div>
        ) : (
          /* Order Confirmed State */
          <div className="py-8 text-center space-y-4">
            <div className="inline-flex p-3 rounded-full bg-green-500/10 text-green-500 mb-2">
              <CheckCircle className="w-12 h-12 animate-bounce" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">Order Received!</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
              Your {quantity}x {config.title} combo is sizzling on the grill. Get ready for authentic flavour trails!
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-sans font-semibold text-xs tracking-wider uppercase hover:opacity-90 transition-opacity"
              >
                Back to Meal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
