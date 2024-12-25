'use client';

import Cookies from 'js-cookie';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import ImageCard, { ImageCardProps } from '@/components/ui/cards/ImageCard';
import ImageCardSkeleton from '@/components/ui/cards/ImageCardSkeleton';
import { fetchImageCards } from '@/lib/api/fetchImageCards';

type ScoreKey = '😇' | '😶‍🌫️' | '😁' | '😲' | '🤓' | '🤑';

export default function ImageCardFeed() {
  const [imageCards, setImageCards] = useState<Array<ImageCardProps>>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();

  const settingsMap: Map<ScoreKey, string> = new Map(
    Object.entries(JSON.parse(Cookies.get('settings') || '{}')).filter(([key]) =>
      ['😇', '😶‍🌫️', '😁', '😲', '🤓', '🤑'].includes(key),
    ) as [ScoreKey, string][],
  );
  const settingsMapRef = useRef(settingsMap);
  const initialized = useRef(false);

  const loadMoreImageCards = useCallback(async () => {
    if (!hasMore) return;

    setLoading(true);
    const newImageCards = await fetchImageCards(page, 10, settingsMapRef.current);
    if (
      newImageCards.length === 0 ||
      newImageCards.some((card) => card.title === 'Nem található a cikk')
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
      const initialImageCards = await fetchImageCards(0, 10, settingsMapRef.current);
      setImageCards(initialImageCards);
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

  return (
    <div className="flex flex-wrap gap-4">
      {!loading &&
        imageCards.map((card, index) => {
          if (card.title !== 'Nem található a cikk') {
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
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <ImageCardSkeleton key={`skeleton-${index}`} />
        ))}
      <div ref={ref} />
    </div>
  );
}
