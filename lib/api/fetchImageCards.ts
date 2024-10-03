import { v4 as uuidv4 } from 'uuid';

export const fetchImageCards = async (page: number, limit: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from({ length: limit }, (_, i) => ({
    id: uuidv4(),
    title: `Beautiful Landscape ${page * limit + i + 1}`,
    href: `/article/${page * limit + i + 1}`,
    image: `/placeholder.jpeg`,
    scores: new Map([
      ['😇', `${Math.floor(Math.random() * 100)}`],
      ['😶‍🌫️', `${Math.floor(Math.random() * 100)}`],
      ['😁', `${Math.floor(Math.random() * 100)}`],
      ['😲', `${Math.floor(Math.random() * 100)}`],
      ['🤓', `${Math.floor(Math.random() * 100)}`],
      ['🤑', `${Math.floor(Math.random() * 100)}`],
    ]),
  }));
};
