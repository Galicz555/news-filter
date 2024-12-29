'use client';

import Image from 'next/image';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import { fetchItem, Item } from '@/lib/api/fetchItems';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface ItemsPageProps {
  params: {
    id: string;
  };
}

export default function ItemsPage({ params }: ItemsPageProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [item, setItem] = useState<Item>();

  useEffect(() => {
    fetchItem(params.id).then((item) => setItem(item));
  }, [params.id]);

  return (
    <AnimatedContainer>
      <div
        className="dark:text-[hsl(var(--antique-gold))] h-screen md:h-auto flex flex-col gap-4"
        style={{ position: 'relative' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="flex flex-col md:flex-row">
          <div className="z-10">
            {item?.image && (
              <Image
                className="z-10 md:blur-xl"
                src={item?.image}
                alt={item?.title || 'Article image'}
                fill
                quality={100}
                priority={true}
                style={{ objectFit: 'cover' }}
              />
            )}
          </div>

          <div
            className={`relative z-10 w-full ${!showInfo ? '' : 'md:w-1/2'} h-64 md:h-screen hidden md:block m-4`}
          >
            {item?.image && (
              <Image
                className="z-10"
                src={item?.image}
                alt={item?.title || 'Article image'}
                fill
                quality={100}
                priority={true}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>

          {showInfo && item && (
            <div className="relative z-10 flex items-center justify-center p-4">
              <article className="max-w-2xl w-full bg-white dark:bg-black dark:bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
                <div className="p-8 flex flex-col gap-4 text-lg leading-relaxed" id={item?.title}>
                  {item?.content && (
                    <div dangerouslySetInnerHTML={{ __html: item.content as string }}></div>
                  )}
                </div>
              </article>
            </div>
          )}
        </div>
        <div className="flex justify-center p-4">
          <Button
            variant="default"
            className="relative z-20 bg-white dark:bg-black dark:bg-opacity-50 text-black dark:text-[hsl(var(--antique-gold))] hover:!bg-black hover:!bg-opacity-40 hover:!text-white"
            onClick={() => setShowInfo(!showInfo)}
          >
            Mutasd az információkat
          </Button>
        </div>
      </div>
    </AnimatedContainer>
  );
}
