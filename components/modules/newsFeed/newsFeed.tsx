'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ImageCard, { ImageCardProps } from '@/components/ui/cards/ImageCard';
// import ImageCardSkeleton from '@/components/ui/cards/ImageCardSkeleton';
import { fetchImageCards, fetchImportantArticles } from '@/lib/api/fetchImageCards';
import { Button } from '@/components/ui/Button';
import { runStoryGeneration } from '@/lib/api/runStoryGeneration';

export default function ImageCardFeed() {
  const [imageCards, setImageCards] = useState<Array<ImageCardProps>>([]);
  const [secondColumnCards, setSecondColumnCards] = useState<Array<ImageCardProps>>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const initialized = useRef(false);

  const loadMoreImageCards = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    const newImageCards = await fetchImageCards(page, 10);
    if (
      newImageCards.length === 0 ||
      newImageCards.some((card) => card.content === 'Nem található a cikk')
    ) {
      setHasMore(false);
    } else {
      setImageCards((prevImageCards) => [...prevImageCards, ...newImageCards]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [page, hasMore]);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      const initialImageCards = await fetchImageCards(0, 10);
      const secondColumnCards = await fetchImportantArticles(0, 10);
      setImageCards(initialImageCards);
      setSecondColumnCards(secondColumnCards);
      setPage(1);
      setLoading(false);
      if (initialImageCards.length === 0) {
        setHasMore(false);
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      initialLoad();
    }
  }, []);

  // Load more when inView
  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreImageCards();
    }
  }, [inView, loadMoreImageCards, loading, hasMore]);

  const runStoryGenAndReloadImageCards = async () => {
    await runStoryGeneration();
    setImageCards([]);
    setPage(0);
    setHasMore(true);
    loadMoreImageCards();
  };

  const firstCol = imageCards.slice(0, Math.ceil(imageCards.length / 2));
  const thirdCol = imageCards.slice(Math.ceil(imageCards.length / 2));

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-8">
        <div className="col-span-1 md:col-span-2 grid gap-8 grid-rows-5 order-2 md:order-1">
          {firstCol.map((card, index) => {
            if (card.content !== 'Nem található a cikk') {
              return (
                <ImageCard
                  key={card.id}
                  id={card.id}
                  image={card.image}
                  title={card.title}
                  href={card.href}
                  priority={index < 10}
                  scores={card.scores}
                />
              );
            }
          })}
        </div>
        <div className="col-span-1 md:col-span-3 grid gap-8 grid-rows-1 md:grid-rows-5 order-1 md:order-2">
          {secondColumnCards.map((card, index) => {
            if (card.content !== 'Nem található a cikk') {
              return (
                <ImageCard
                  key={card.id}
                  id={card.id}
                  image={card.image}
                  title={card.title}
                  href={card.href}
                  priority={index < 10}
                  scores={card.scores}
                />
              );
            }
          })}
        </div>
        <div className="col-span-1 md:col-span-2 grid gap-8 grid-rows-5 order-3">
          {thirdCol.map((card, index) => {
            if (card.content !== 'Nem található a cikk') {
              return (
                <ImageCard
                  key={card.id}
                  id={card.id}
                  image={card.image}
                  title={card.title}
                  href={card.href}
                  priority={index < 10}
                  scores={card.scores}
                />
              );
            }
          })}
        </div>
      </div>
      {/* {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <ImageCardSkeleton key={`skeleton-${index}`} />
        ))} */}
      <div ref={ref} />
      {!loading && (
        <div className="w-full flex justify-center">
          <Button variant="outline" onClick={runStoryGenAndReloadImageCards}>
            {imageCards.length > 0 ? 'Folytasd az újságírást' : 'Végezz kutatómunkát'}
          </Button>
        </div>
      )}
    </div>
  );
}
