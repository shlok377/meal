import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface BackgroundTypographyProps {
  title: string;
  isVisible?: boolean;
}

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  hidden: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const rowVariants: Variants = {
  visible: {
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hidden: {
    y: -25,
    scale: 0.98,
    transition: {
      duration: 0.35,
      ease: 'easeIn',
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
            {/* Row 1 (Top) - Clearly visible display text */}
            <motion.h1
              variants={rowVariants}
              style={{ opacity: 0.35 }}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900 dark:text-neutral-100 uppercase pointer-events-none"
            >
              {title}
            </motion.h1>

            {/* Row 2 - Intermediate soft fade */}
            <motion.div
              variants={rowVariants}
              style={{ opacity: 0.22 }}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900 dark:text-neutral-100 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 3 - Subtle faint fade */}
            <motion.div
              variants={rowVariants}
              style={{ opacity: 0.12 }}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900 dark:text-neutral-100 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 4 (Bottom-most) - Guaranteed to be the LIGHTEST whisper of text */}
            <motion.div
              variants={rowVariants}
              style={{ opacity: 0.05 }}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900 dark:text-neutral-100 uppercase pointer-events-none"
            >
              {title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
