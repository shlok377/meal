import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface BackgroundTypographyProps {
  title: string;
  isVisible?: boolean;
}

// Slow/medium staggered fade-in / fade-out animation
const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  hidden: {
    transition: {
      staggerChildren: 0.09,
      staggerDirection: -1,
    },
  },
};

const rowVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // Smooth medium cubic-bezier
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

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
            {/* Row 1 - Top row (Darkest of the background stack) */}
            <motion.h1
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/35 dark:text-neutral-100/30 uppercase pointer-events-none"
            >
              {title}
            </motion.h1>

            {/* Row 2 - Medium */}
            <motion.div
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/20 dark:text-neutral-100/18 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 3 - Light */}
            <motion.div
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/10 dark:text-neutral-100/10 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 4 - Bottom-most row (Lightest of the entire stack) */}
            <motion.div
              variants={rowVariants}
              className="hidden lg:block font-serif font-black tracking-[-0.04em] text-[11.5vw] text-neutral-900/5 dark:text-neutral-100/5 uppercase pointer-events-none"
            >
              {title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
