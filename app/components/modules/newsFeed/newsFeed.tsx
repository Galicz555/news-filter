'use client';

import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import ImageCard from '@/app/components/ui/cards/ImageCard';
import ImageCardSkeleton from '@/app/components/ui/cards/ImageCardSkeleton';

const fetchImageCards = async (page: number, limit: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    title: `Beautiful Landscape ${page * limit + i + 1}`,
    image: `/placeholder.jpg`,
  }));
};

export default function ImageCardFeed() {
  const [imageCards, setImageCards] = useState<
    Array<{ id: number; title: string; image: string }>
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

  useEffect(() => {
    if (inView) {
      loadMoreImageCards();
    }
  }, [inView, loadMoreImageCards]);

  return (
    <div className="flex flex-wrap gap-4">
      {imageCards.map((card) => (
        <ImageCard key={card.id} />
      ))}
      {loading &&
        Array.from({ length: 10 }).map((_, index) => (
          <ImageCardSkeleton key={index} />
        ))}
      <div ref={ref} />
    </div>
  );
}
