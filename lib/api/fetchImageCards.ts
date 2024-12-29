'use server';

import { v4 as uuidv4 } from 'uuid';
import { világosodj_meg } from '@/utils/áramlatok/fő';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

type ScoreKey = '😇' | '😶‍🌫️' | '😁' | '😲' | '🤓' | '🤑';

interface Article {
  id: string;
  title?: string;
  content?: string;
  href: string;
  image?: string;
  relatedArticles?: {
    url: string;
    title: string;
  }[];
  scores?: Map<ScoreKey, string>;
}

const scoreKeyMap: Record<string, ScoreKey> = {
  jóságosság: '😇',
  filozófikusság: '😶‍🌫️',
  viccesség: '😁',
  meglepőség: '😲',
  alaposság: '🤓',
  pénzügyi_haszon: '🤑',
};

const sumArticleScores = (
  image: {
    id: string;
    title?: string;
    href: string;
    image?: string;
    scores?: Map<ScoreKey, string>;
  },
  settings: Map<ScoreKey, string>,
): number => {
  let sum = 0;
  if (!image.scores) {
    return sum;
  }
  for (const [key, value] of image.scores) {
    if (settings.has(key) && settings.get(key)) {
      sum += parseInt(value, 10);
    }
  }
  return sum;
};

async function getArticleContent(article: string): Promise<Article> {
  const decodedArticle = decodeURIComponent(article);
  // const story = readSpecificFiles(dir, [`${decodedArticle}.json`])[0];
  const story = (await redis.get(`${decodedArticle}`)) as Article;

  if (!story?.title || !story?.content) {
    return {
      id: uuidv4(),
      title: 'Nem található a cikk',
      content: 'Nem található a cikk',
      href: `/article/${article}`,
    };
  }

  // const files = await readFolder(dir);

  const relatedArticlesKeys = await redis.keys(
    `${decodedArticle.split('_').slice(0, 2).join('_')}*`,
  );
  const relatedArticlesPromises = relatedArticlesKeys
    .filter((key: string) => key !== `${decodedArticle}`)
    .map(async (key: string) => {
      const relatedStory = (await redis.get(key)) as Article;
      return {
        url: `/article/${key.slice(8)}`, // remove 'article:'
        title: relatedStory.title || 'Untitled',
      };
    });

  // const relatedArticlesPromises = files
  //   .filter((file: string) => file.includes(decodedArticle.split('_').slice(0, 2).join('_')))
  //   .filter((file: string) => file !== `${decodedArticle}.json`)
  //   .map(async (file: string) => {
  //     const relatedStory = readSpecificFiles(dir, [file])[0];
  //     return {
  //       url: `/article/${file.slice(0, -5)}`, //remove .json
  //       title: relatedStory.title || 'Untitled',
  //     };
  //   });

  const {
    title,
    content,
    image = '/images/Doskvol_newspaper.webp',
    értékelés = {},
  } = story as {
    title: string;
    content: string;
    image: string;
    értékelés?: Record<string, number>;
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
    title,
    content,
    href: `/article/${decodedArticle}`,
    image,
    relatedArticles: await Promise.all(relatedArticlesPromises),
    scores,
  };
}

export async function fetchImageCards(
  page: number,
  limit: number,
  settings?: Map<ScoreKey, string>,
): Promise<Article[]> {
  const start = page * limit;

  const highestIndex = await getHighestIndex('bitd');

  const articles = await Promise.all(
    Array.from({ length: limit }, (_, i) =>
      getArticleContent(`bitd:story_${start + i}_folyt_${highestIndex}.json`),
    ),
  );

  if (!settings) {
    return articles;
  }

  const sortedArticles = articles.sort(
    (a, b) => sumArticleScores(b, settings) - sumArticleScores(a, settings),
  );

  return sortedArticles;
}

export async function fetchImportantArticles(page: number, limit: number): Promise<Article[]> {
  const start = page * limit;

  // const highestIndex = await getHighestIndex('./bitd/importantNews');

  const articles = await Promise.all(
    Array.from({ length: limit }, (_, i) => getArticleContent(`bitd:main_story_${start + i}.json`)),
  );

  return articles;
}

export async function fetchArticle(article: string): Promise<Article> {
  return getArticleContent(`${article}.json`);
}

export const fetchVilágosodás = async () => {
  try {
    await világosodj_meg();
    console.log('Sikeresen lefutott a program.');
  } catch (err) {
    console.error(err);
  }
};

async function getHighestIndex(prefix: string): Promise<number> {
  const keys = await redis.keys(`${prefix}:story_*_folyt_*`);
  const highestIndex = keys
    .map((key) => parseInt(key.split('_').pop()!.split('.')[0]))
    .sort((a, b) => b - a)[0];
  return highestIndex;
}

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
