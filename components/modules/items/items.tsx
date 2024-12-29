'use client';

import { useEffect, useRef, useState } from 'react';
import ImageCard from '@/components/ui/cards/ImageCard';
import { fetchItemCards, Item } from '@/lib/api/fetchItems';
import { Button } from '@/components/ui/Button';
import { runItemGeneration } from '@/lib/api/generations/item';

export default function ItemsFeed() {
  const [loading, setLoading] = useState(false);
  const [itemCards, setItemCards] = useState<Array<Item>>([]);
  const initialized = useRef(false);
  const type = 'item';

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      const initialImageCards = await fetchItemCards(type);
      setItemCards(initialImageCards);
      setLoading(false);
    };

    if (!initialized.current) {
      initialized.current = true;
      initialLoad();
    }
  }, []);

  const generateItems = async () => {
    setLoading(true);
    await runItemGeneration();
    const newImageCards = await fetchItemCards(type);
    setItemCards(newImageCards);
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
        {itemCards.map((card, index) => {
          if (card.content !== 'Nem található a cikk') {
            return (
              <ImageCard
                key={card.id}
                id={card.id}
                image={card.image}
                title={card.title}
                href={card.href}
                priority={index < 10}
                type={type}
                isAlive={card.isAlive}
              />
            );
          }
        })}
      </div>
      {!loading && (
        <div className="w-full flex justify-center">
          <Button variant="outline" onClick={generateItems}>
            Készíts új tárgyakat
          </Button>
        </div>
      )}
      {loading && <div className="w-full flex justify-center">Loading...</div>}
    </div>
  );
}
