'use client';

import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedContainerProps {
  children: ReactNode;
}

const AnimatedContainer = ({ children }: AnimatedContainerProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedContainer;
