'use server';

import { v4 as uuidv4 } from 'uuid';
import { világosodj_meg } from '@/utils/áramlatok/fő';
import { Redis } from '@upstash/redis';

type ScoreKey = '😇' | '😶‍🌫️' | '😁' | '😲' | '🤓' | '🤑';

interface Article {
  id: string;
  title: string;
  href: string;
  image: string;
  scores: Map<ScoreKey, string>;
}

const scoreKeyMap: Record<string, ScoreKey> = {
  jóságosság: '😇',
  filozófikusság: '😶‍🌫️',
  viccesség: '😁',
  meglepőség: '😲',
  alaposság: '🤓',
  pénzügyi_haszon: '🤑',
};

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const sumArticleScores = (
  image: {
    id: string;
    title: string;
    href: string;
    image: string;
    scores: Map<ScoreKey, string>;
  },
  settings: Map<ScoreKey, string>,
): number => {
  let sum = 0;
  for (const [key, value] of image.scores) {
    if (settings.has(key) && settings.get(key)) {
      sum += parseInt(value, 10);
    }
  }
  return sum;
};

async function getArticleContent(index: number): Promise<Article> {
  const key = `cikkek:enlightment:${index}`;
  let content = await redis.get(key);
  if (!content) {
    content = { szöveg: 'Nem található a cikk', értékelés: {} };
  }

  const { szöveg, értékelés = {} } = content as {
    szöveg: string;
    értékelés: Record<string, number>;
  };

  const scores = new Map<ScoreKey, string>(
    Object.entries(értékelés)
      .map(([key, value]) => {
        const scoreKey = scoreKeyMap[key];
        return scoreKey ? [scoreKey, (value as number).toString()] : undefined;
      })
      .filter((entry): entry is [ScoreKey, string] => entry !== undefined),
  );

  return {
    id: uuidv4(),
    title: szöveg,
    href: `/article/${index}`,
    image: `/placeholder.jpeg`,
    scores,
  };
}

export async function fetchImageCards(
  page: number,
  limit: number,
  settings: Map<ScoreKey, string>,
): Promise<Article[]> {
  const start = page * limit;
  const end = start + limit;

  const articles = await Promise.all(
    Array.from({ length: limit }, (_, i) => getArticleContent(start + i)),
  );

  const sortedArticles = articles.sort(
    (a, b) => sumArticleScores(b, settings) - sumArticleScores(a, settings),
  );

  return sortedArticles;
}

export async function fetchArticle(index: number): Promise<Article> {
  return getArticleContent(index);
}

export const fetchVilágosodás = async() => {
  try {
    await világosodj_meg();
    console.log('Sikeresen lefutott a program.');
  } catch (err) {
    console.error(err);
  }
};

// const generateImageCards = (page: number, limit: number) => {
//   return Array.from({ length: limit }, (_, i) => ({
//     id: uuidv4(),
//     title: `Beautiful Landscape ${page * limit + i + 1}`,
//     href: `/article/${page * limit + i + 1}`,
//     image: `/placeholder.jpeg`,
//     scores: new Map<ScoreKey, string>([
//       ['😇', `${Math.floor(Math.random() * 100)}`],
//       ['😶‍🌫️', `${Math.floor(Math.random() * 100)}`],
//       ['😁', `${Math.floor(Math.random() * 100)}`],
//       ['😲', `${Math.floor(Math.random() * 100)}`],
//       ['🤓', `${Math.floor(Math.random() * 100)}`],
//       ['🤑', `${Math.floor(Math.random() * 100)}`],
//     ]),
//   }));
// };

// const images = generateImageCards(0, 100);
