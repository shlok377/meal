import React from 'react';

interface BackgroundTypographyProps {
  title: string;
}

export const BackgroundTypography: React.FC<BackgroundTypographyProps> = ({ title }) => {
  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 leading-[0.88] opacity-90 dark:opacity-85 overflow-hidden"
    >
      <div className="w-full text-center flex flex-col items-center justify-center space-y-[-1vw] md:space-y-[-1.5vw] translate-y-[-2vh] pointer-events-none">
        <h1 className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/80 dark:text-neutral-100/75 uppercase drop-shadow-sm pointer-events-none">
          {title}
        </h1>
        <div className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/55 dark:text-neutral-100/40 uppercase pointer-events-none">
          {title}
        </div>
        <div className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/35 dark:text-neutral-100/20 uppercase pointer-events-none">
          {title}
        </div>
        <div className="hidden lg:block font-serif font-black tracking-[-0.04em] text-[11.5vw] text-neutral-900/15 dark:text-neutral-100/10 uppercase pointer-events-none">
          {title}
        </div>
      </div>
    </div>
  );
};
