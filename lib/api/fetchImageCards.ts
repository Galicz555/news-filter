'use server';

import { v4 as uuidv4 } from 'uuid';

type ScoreKey = '😇' | '😶‍🌫️' | '😁' | '😲' | '🤓' | '🤑';

const generateImageCards = (page: number, limit: number) => {
  return Array.from({ length: limit }, (_, i) => ({
    id: uuidv4(),
    title: `Beautiful Landscape ${page * limit + i + 1}`,
    href: `/article/${page * limit + i + 1}`,
    image: `/placeholder.jpeg`,
    scores: new Map<ScoreKey, string>([
      ['😇', `${Math.floor(Math.random() * 100)}`],
      ['😶‍🌫️', `${Math.floor(Math.random() * 100)}`],
      ['😁', `${Math.floor(Math.random() * 100)}`],
      ['😲', `${Math.floor(Math.random() * 100)}`],
      ['🤓', `${Math.floor(Math.random() * 100)}`],
      ['🤑', `${Math.floor(Math.random() * 100)}`],
    ]),
  }));
};

const images = generateImageCards(0, 100);

export const fetchImageCards = async (
  page: number,
  limit: number,
  settings: Map<ScoreKey, string>,
) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const sumImageScores = (image: {
    id: string;
    title: string;
    href: string;
    image: string;
    scores: Map<ScoreKey, string>;
  }): number => {
    let sum = 0;
    for (const [key, value] of image.scores) {
      if (settings.has(key) && settings.get(key)) {
        sum += parseInt(value, 10);
      }
    }
    return sum;
  };
  const sortedImages = images.sort(
    (a, b) => sumImageScores(b) - sumImageScores(a),
  );

  return sortedImages.slice(page * limit, (page + 1) * limit);
};
