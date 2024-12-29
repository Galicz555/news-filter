import CharactersFeed from '@/components/modules/characters/characters';
import BasePageLayout from '@/components/ui/layout/page/base/layout';

export default function Characters() {
  return (
    <BasePageLayout
      mainContent={<CharactersFeed />}
      footerContent={<div>Made by Galicz Mihály</div>}
    ></BasePageLayout>
  );
}
