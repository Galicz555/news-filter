'use client';

import { useEffect, useRef, useState } from 'react';
import ImageCard from '@/components/ui/cards/ImageCard';
import { fetchItemCards, Item } from '@/lib/api/fetchItems';

export default function ItemsFeed() {
  const [itemCards, setItemCards] = useState<Array<Item>>([]);
  const initialized = useRef(false);
  const type = 'item';

  useEffect(() => {
    const initialLoad = async () => {
      const initialImageCards = await fetchItemCards(type);
      setItemCards(initialImageCards);
    };

    if (!initialized.current) {
      initialized.current = true;
      initialLoad();
    }
  }, []);

  return (
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
  );
}
