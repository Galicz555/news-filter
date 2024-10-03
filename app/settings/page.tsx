import { cookies } from 'next/headers';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import SortSettings from '@/app/settings/SortSettings';
import DarkModeSwitch from '@/components/ui/switches/DarkMode';
import BasePageLayout from '@/components/ui/layout/page/base/layout';

const defaultSettings = {
  happy: false,
  sophisticated: false,
  spiritual: false,
};

export default function SettingsPage() {
  const cookieStore = cookies();
  const settingsCookie = cookieStore.get('settings');
  const initialSettings = settingsCookie
    ? JSON.parse(settingsCookie.value)
    : defaultSettings;

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
