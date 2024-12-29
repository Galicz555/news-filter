'use client';

// import ImageCardFeed from '@/components/modules/newsFeed/newsFeed';
import { Button } from '@/components/ui/Button';
import BasePageLayout from '@/components/ui/layout/page/base/layout';
import { uploadFilesToRedis } from '@/lib/api/fetchCharacters';

export default function Home() {
  const characterUpload = async () => {
    await uploadFilesToRedis('./bitd/characters');
  };
  const newsUpload = async () => {
    await uploadFilesToRedis('./bitd');
  };
  const importantNewsUpload = async () => {
    await uploadFilesToRedis('./bitd/importantNews');
  };

  return (
    <BasePageLayout
      mainContent={
        <div className="flex flex-col items-center justify-center">
          <Button variant="outline" onClick={importantNewsUpload}>
            Töltsd fel a fontos híreket a Redisbe!
          </Button>
          <Button variant="outline" onClick={newsUpload}>
            Töltsd fel a híreket a Redisbe!
          </Button>
          <Button variant="outline" onClick={characterUpload}>
            Töltsd fel a karaktereket a Redisbe!
          </Button>
        </div>
      }
      // mainContent=
      // {
      //   <ImageCardFeed />
      // }
      footerContent={<div>Made by Galicz Mihály</div>}
    ></BasePageLayout>
  );
}
