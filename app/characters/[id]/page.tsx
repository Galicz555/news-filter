'use client';

import Image from 'next/image';
import AnimatedContainer from '@/components/ui/animation/AnimatedContainer';
import { fetchCharacter, Item } from '@/lib/api/fetchCharacters';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface CharacterPageProps {
  params: {
    id: string;
  };
}

export default function CharacterPage({ params }: CharacterPageProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [character, setCharacter] = useState<Item>();
  // const character = fetchCharacter(params.id);

  useEffect(() => {
    const fetchCharacter2 = async () => {
      const character = await fetchCharacter(params.id);
      setCharacter(character);
    };

    fetchCharacter2();
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
            {character?.image && (
              <Image
                className="z-10 md:blur-xl"
                src={character?.image}
                alt={character?.title || 'Article image'}
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
            {character?.image && (
              <Image
                className="z-10"
                src={character?.image}
                alt={character?.title || 'Article image'}
                fill
                quality={100}
                priority={true}
                style={{ objectFit: 'contain' }}
              />
            )}
          </div>

          {showInfo && character && (
            <div className="relative z-10 flex items-center justify-center p-4">
              <article className="max-w-2xl w-full bg-white dark:bg-black dark:bg-opacity-50 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden">
                <div
                  className="p-8 flex flex-col gap-4 text-lg leading-relaxed"
                  id={character?.title}
                >
                  {/* <h1 className="text-4xl font-bold mb-4 text-white">{article?.title}</h1> */}
                  <h1 className="text-2xl font-bold mb-4 text-center">Név: {character?.title}</h1>
                  {character?.looks && (
                    <p>
                      <strong>Kinézet:</strong> {character?.looks}
                    </p>
                  )}
                  {character?.backstory && (
                    <p>
                      <strong>Háttértörténet:</strong> {character?.backstory}
                    </p>
                  )}
                  {character.motivations && (
                    <p>
                      <strong>Motivációk:</strong> {character?.motivations}
                    </p>
                  )}
                  {character?.personality && (
                    <p>
                      <strong>Személyiség:</strong> {character?.personality}
                    </p>
                  )}
                  {character?.influence && (
                    <p>
                      <strong>Befolyás:</strong> {character?.influence}
                    </p>
                  )}
                  {character?.followers && (
                    <p>
                      <strong>Követők:</strong> {character?.followers}
                    </p>
                  )}
                  {character?.enemies && (
                    <p>
                      <strong>Ellenségek:</strong> {character?.enemies}
                    </p>
                  )}

                  {character?.content && (
                    <div dangerouslySetInnerHTML={{ __html: character.content as string }}></div>
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
