import React from 'react';
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
      {/* 3D WebGL Orbit Canvas */}
      <OrbitStage
        theme={theme}
        preset={preset}
        onPresetChange={setPreset}
      />

      {/* 2D Luxury Editorial Poster UI Overlay */}
      <EditorialOverlay
        config={mealData}
        theme={theme}
        preset={preset}
        onToggleTheme={toggleTheme}
        onSelectPreset={setPreset}
        onOpenOrder={openOrder}
      />

      {/* Artisan Meal Order & Nutritional Breakdown Modal */}
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
