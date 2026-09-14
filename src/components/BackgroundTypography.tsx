import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface BackgroundTypographyProps {
  title: string;
  isVisible?: boolean;
}

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.1,
    },
  },
  hidden: {
    transition: {
      staggerChildren: 0.12,
      staggerDirection: -1,
    },
  },
};

// Pure fading in and fading out with custom opacity per row
const rowVariants: Variants = {
  visible: (customOpacity: number) => ({
    opacity: customOpacity,
    transition: {
      duration: 0.85,
      ease: [0.4, 0, 0.2, 1], // smooth medium ease
    },
  }),
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.65,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

// Row target opacities from top to bottom (bottom-most is the lightest)
const ROW_OPACITIES = [0.35, 0.22, 0.12, 0.04];

export const BackgroundTypography: React.FC<BackgroundTypographyProps> = ({
  title,
  isVisible = true,
}) => {
  return (
    <div 
      aria-hidden="true" 
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 leading-[0.88] overflow-hidden"
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-full text-center flex flex-col items-center justify-center space-y-[-1vw] md:space-y-[-1.5vw] translate-y-[-2vh] pointer-events-none"
          >
            {ROW_OPACITIES.map((opacity, idx) => (
              <motion.div
                key={idx}
                custom={opacity}
                variants={rowVariants}
                className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900 dark:text-neutral-100 uppercase pointer-events-none"
              >
                {title}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
