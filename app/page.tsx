import ImageCardFeed from '../components/modules/newsFeed/newsFeed';
import AnimatedContainer from '../components/ui/animation/AnimatedContainer';
import BasePageLayout from '@/components/ui/layout/page/base/layout';

export default function Home() {
  return (
    <AnimatedContainer>
      <BasePageLayout
        mainContent={<ImageCardFeed />}
        footerContent={<div>Made by Galicz Mihály</div>}
      ></BasePageLayout>
    </AnimatedContainer>
  );
}
