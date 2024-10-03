'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import Switch from '@/components/ui/switches/base/Switch';

interface SortSettingsProps {
  initialSettings: {
    [key: string]: boolean;
  };
}

export default function SortSettings({ initialSettings }: SortSettingsProps) {
  const [settings, setSettings] = useState(initialSettings);

  const updateSetting = (key: string) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    Cookies.set('settings', JSON.stringify(newSettings), { expires: 365 });
  };

  return (
    <div className="space-y-4">
      {Object.entries(settings).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <span className="text-lg capitalize">{key}</span>
          <Switch isOn={value} toggleSwitch={() => updateSetting(key)} />
        </div>
      ))}
    </div>
  );
}
