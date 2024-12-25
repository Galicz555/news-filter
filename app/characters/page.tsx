import ImageCardFeed from '@/components/modules/newsFeed/newsFeed';
import BasePageLayout from '@/components/ui/layout/page/base/layout';

export default function Characters() {
  return (
    <BasePageLayout
      mainContent={<ImageCardFeed />}
      footerContent={<div>Made by Galicz Mihály</div>}
    ></BasePageLayout>
  );
}
