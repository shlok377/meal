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
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hidden: {
    opacity: 0,
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
            {/* Row 1 - 50% reduced opacity */}
            <motion.h1
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/40 dark:text-neutral-100/35 uppercase pointer-events-none"
            >
              {title}
            </motion.h1>

            {/* Row 2 - 50% reduced opacity */}
            <motion.div
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/25 dark:text-neutral-100/20 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 3 - 50% reduced opacity */}
            <motion.div
              variants={rowVariants}
              className="font-serif font-black tracking-[-0.04em] text-[16vw] sm:text-[14vw] md:text-[11.5vw] text-neutral-900/15 dark:text-neutral-100/10 uppercase pointer-events-none"
            >
              {title}
            </motion.div>

            {/* Row 4 - 50% reduced opacity */}
            <motion.div
              variants={rowVariants}
              className="hidden lg:block font-serif font-black tracking-[-0.04em] text-[11.5vw] text-neutral-900/08 dark:text-neutral-100/05 uppercase pointer-events-none"
            >
              {title}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
