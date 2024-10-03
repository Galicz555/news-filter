'use client';

import { motion } from 'framer-motion';

interface SwitchProps {
  isOn: boolean;
  toggleSwitch: () => void;
}

export default function Switch({ isOn, toggleSwitch }: SwitchProps) {
  return (
    <motion.div
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn
          ? 'bg-[hsl(var(--holy-yellow))] dark:bg-[hsl(var(--holy-yellow))] hover:bg-[hsl(var(--holy-yellow), 0.9)]  focus:ring-2 focus:ring-[hsl(var(--holy-yellow), 0.7)]'
          : 'bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-900 focus:ring-2 focus:ring-gray-200'
      }`}
      onClick={toggleSwitch}
    >
      <motion.div
        className={`w-6 h-6 rounded-full shadow-md transition-colors duration-300 ${
          isOn
            ? 'bg-[hsl(var(--holy-yellow))] dark:bg-[hsl(var(--holy-yellow))] border-2 border-white'
            : 'bg-white dark:bg-gray-300'
        }`}
        layout
        transition={{
          type: 'spring',
          stiffness: 700,
          damping: 30,
        }}
        animate={{
          x: isOn ? '100%' : '0%',
        }}
      />
    </motion.div>
  );
}
