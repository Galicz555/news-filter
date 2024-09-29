'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import ImageCard from '@/app/components/ui/cards/ImageCard';
import ImageCardSkeleton from '@/app/components/ui/cards/ImageCardSkeleton';

const fetchImageCards = async (page: number, limit: number) => {
  const response = await fetch(`/api/imageCards?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch image cards');
  }
  return response.json();
};

export default function ImageCardFeed() {
  const [imageCards, setImageCards] = useState<
    Array<{ id: number; title: string; image: string; href: string }>
  >([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView();

  const loadMoreImageCards = useCallback(async () => {
    setLoading(true);
    const newImageCards = await fetchImageCards(page, 10);
    setImageCards((prevImageCards) => [...prevImageCards, ...newImageCards]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  }, [page]);

  // Initial load
  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      const initialImageCards = await fetchImageCards(0, 10);
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
          image={card.image}
          title={card.title}
          href={card.href}
          priority={index < 10}
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
