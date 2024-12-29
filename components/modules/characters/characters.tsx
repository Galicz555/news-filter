'use client';

import { useEffect, useRef, useState } from 'react';
import ImageCard from '@/components/ui/cards/ImageCard';
import { Character, fetchCharacterCards } from '@/lib/api/fetchCharacters';

export default function CharactersFeed() {
  const [characterCards, setCharacterCards] = useState<Array<Character>>([]);
  const initialized = useRef(false);
  const type = 'character';

  useEffect(() => {
    const initialLoad = async () => {
      const initialImageCards = await fetchCharacterCards(type);
      setCharacterCards(initialImageCards);
    };

    if (!initialized.current) {
      initialized.current = true;
      initialLoad();
    }
  }, []);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
      {characterCards.map((card, index) => {
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
