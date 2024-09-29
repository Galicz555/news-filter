'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function Page() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Under construction...</p>
      </motion.div>
    </AnimatePresence>
  );
}
