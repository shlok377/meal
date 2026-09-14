import React from 'react';
import { BackgroundTypography } from './components/BackgroundTypography';
import { OrbitStage } from './components/OrbitStage';
import { EditorialOverlay } from './components/EditorialOverlay';
import { OrderModal } from './components/OrderModal';
import { useMealExperience } from './hooks/useMealExperience';
import { mealData } from './data/mealData';

export const App: React.FC = () => {
  const {
    theme,
    toggleTheme,
    preset,
    setPreset,
    isOrderOpen,
    openOrder,
    closeOrder,
  } = useMealExperience();

  return (
    <main 
      className={`relative w-full h-screen min-h-screen overflow-hidden select-none transition-colors duration-700 ${
        theme === 'dark' ? 'bg-[#131316] text-[#EDE8DF]' : 'bg-[#F7F3EA] text-[#141414]'
      }`}
    >
      {/* LAYER 0 (z-0): Background Stacked Typography (animates out on burger/fries focus, in on combo) */}
      <BackgroundTypography 
        title={mealData.title} 
        isVisible={preset === 'combo'}
      />

      {/* LAYER 1 (z-10): 3D WebGL Orbit Canvas */}
      <OrbitStage
        theme={theme}
        preset={preset}
      />

      {/* LAYER 2 (z-20): 2D Luxury Editorial Poster UI Controls */}
      <EditorialOverlay
        config={mealData}
        theme={theme}
        preset={preset}
        onToggleTheme={toggleTheme}
        onSelectPreset={setPreset}
        onOpenOrder={openOrder}
      />

      {/* LAYER 3 (z-50): Artisan Meal Order & Nutritional Breakdown Modal */}
      <OrderModal
        isOpen={isOrderOpen}
        onClose={closeOrder}
        config={mealData}
        theme={theme}
      />
    </main>
  );
};

export default App;
