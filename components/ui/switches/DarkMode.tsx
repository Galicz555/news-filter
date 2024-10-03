'use client';

import { useEffect, useState } from 'react';
import Switch from '@/components/ui/switches/base/Switch';

const DarkModeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-lg capitalize">Dark Mode</span>
      <Switch isOn={isDarkMode} toggleSwitch={toggleDarkMode} />
    </div>
  );
};

export default DarkModeSwitch;
