'use server';

import { v4 as uuidv4 } from 'uuid';
import { világosodj_meg } from '@/utils/áramlatok/fő';
import { Redis } from '@upstash/redis';
import { readFolder, readSpecificFiles } from '@/utils/rendszer/fájl';

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

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

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
  const key = `${decodedArticle}.json`
  const story = readSpecificFiles('./bitd', [key])[0];

  if (!story.title || !story.content) {
    return {
      id: uuidv4(),
      title: 'Nem található a cikk',
      content: 'Nem található a cikk',
      href: `/article/${article}`,
    };
  }

  let relatedArticles: { url: string, title: string }[] = [];

  const href = `/article/${decodedArticle}`;
  const files = await readFolder('./bitd');
  const includeKey = decodedArticle.split('_').slice(0, 2).join('_');
  const relatedFiles = files.filter((file: string) => file.includes(includeKey));
  const relatedArticlesPromises = relatedFiles.filter((file: string) => file !== decodedArticle).map(async (file: string) => {
    const relatedStory = readSpecificFiles('./bitd', [file])[0];
    return {
      url: `/article/${file.slice(0, -5)}`, //remove .json
      title: relatedStory.title || 'Untitled'
    };
  });

  relatedArticles = await Promise.all(relatedArticlesPromises);

  const { title, content, értékelés = {} } = story as {
    title: string;
    content: string;
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
    title: title,
    content: content,
    href,
    image: `/images/Doskvol_newspaper.webp`,
    relatedArticles,
    scores,
  };
}

export async function fetchImageCards(
  page: number,
  limit: number,
  settings: Map<ScoreKey, string>,
): Promise<Article[]> {
  const start = page * limit;

  const getHighestIndex = async () => {
    const files = await readFolder('./bitd');

    const highestIndex = files
      .filter((file: string) => file.includes('_folyt_'))
      .map((file: string) => parseInt(file.split('_').pop()!.split('.')[0]))
      .sort((a, b) => b - a)[0];
    return highestIndex;
  }
  const highestIndex = await getHighestIndex();

  const articles = await Promise.all(
    Array.from({ length: limit }, (_, i) => getArticleContent(`bitd:story_${start + i}_folyt_${highestIndex}`)),
  );

  const sortedArticles = articles.sort(
    (a, b) => sumArticleScores(b, settings) - sumArticleScores(a, settings),
  );

  return sortedArticles;
}

export async function fetchArticle(article: string): Promise<Article> {
  return getArticleContent(article);
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
