'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import ImageCard, { ImageCardProps } from '@/components/ui/cards/ImageCard';
import ImageCardSkeleton from '@/components/ui/cards/ImageCardSkeleton';
import { fetchImageCards } from '@/lib/api/fetchImageCards';
import Cookies from 'js-cookie';
import { kapard_le_az_adatokat } from '@/web/kaparó';

type ScoreKey = '😇' | '😶‍🌫️' | '😁' | '😲' | '🤓' | '🤑';

export default function ImageCardFeed() {
  const [imageCards, setImageCards] = useState<Array<ImageCardProps>>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();
  const settings = Cookies.get('settings');
  const settingsObj = JSON.parse(settings || '{}');
  const settingsMap: Map<ScoreKey, string> = new Map(
    Object.entries(settingsObj).filter(([key]) =>
      ['😇', '😶‍🌫️', '😁', '😲', '🤓', '🤑'].includes(key),
    ) as [ScoreKey, string][],
  );
  const settingsMapRef = useRef(settingsMap);

  const loadMoreImageCards = useCallback(async () => {
    setLoading(true);
    const newImageCards = await fetchImageCards(
      page,
      10,
      settingsMapRef.current,
    );
    setImageCards((prevImageCards) => [...prevImageCards, ...newImageCards]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  }, [page]);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      const initialImageCards = await fetchImageCards(
        0,
        10,
        settingsMapRef.current,
      );
      setImageCards(initialImageCards);
      setPage(1);
      setLoading(false);
    };
    initialLoad();
  }, []);

  // Load more when inView
  useEffect(() => {
    if (inView && !loading) {
      loadMoreImageCards();
    }
  }, [inView, loadMoreImageCards, loading]);

  return (
    <div className="flex flex-wrap gap-4">
      {imageCards.map((card, index) => (
        <ImageCard
          key={card.id}
          id={card.id}
          image={card.image}
          title={card.title}
          href={card.href}
          priority={index < 10}
          scores={card.scores}
        />
      ))}
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <ImageCardSkeleton key={`skeleton-${index}`} />
        ))}
      <div ref={ref} />
    </div>
  );
}
