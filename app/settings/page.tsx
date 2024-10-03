'use client';

import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import SortSettings from '@/app/settings/SortSettings';
import DarkModeSwitch from '@/components/ui/switches/DarkMode';
import BasePageLayout from '@/components/ui/layout/page/base/layout';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const defaultSettings = {
  '😇': false,
  '😶‍🌫️': false,
  '😁': false,
  '😲': false,
  '🤓': false,
  '🤑': false,
};

export default function SettingsPage() {
  const [initialSettings, setInitialSettings] = useState(defaultSettings);

  useEffect(() => {
    const settingsCookie = Cookies.get('settings');
    if (settingsCookie) {
      setInitialSettings(JSON.parse(settingsCookie));
    }
  }, []);

  return (
    <AnimatedContainer>
      <BasePageLayout
        mainContent={
          <section className="w-full">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">General settings</h2>
              <DarkModeSwitch />
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Sort settings</h2>
              <SortSettings initialSettings={initialSettings} />
            </section>
          </section>
        }
        footerContent={<div>Made by Galicz Mihály</div>}
      ></BasePageLayout>
    </AnimatedContainer>
  );
}
