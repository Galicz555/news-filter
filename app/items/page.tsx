import ItemsFeed from '@/components/modules/items/items';
import BasePageLayout from '@/components/ui/layout/page/base/layout';

export default function Items() {
  return (
    <BasePageLayout
      mainContent={<ItemsFeed />}
      footerContent={<div>Made by Galicz Mihály</div>}
    ></BasePageLayout>
  );
}
