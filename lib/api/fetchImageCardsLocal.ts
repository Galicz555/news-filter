'use server';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

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

async function getArticleContent(file: string): Promise<Article> {
  const content = fs.readFileSync(`./cikkek/${file}`, 'utf8');
  const { szöveg, értékelés = {} } = JSON.parse(content);

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
    href: `/article/${file}`,
    image: `/placeholder.jpeg`,
    scores,
  };
}

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

export async function fetchImageCards(
  page: number,
  limit: number,
  settings: Map<ScoreKey, string>,
): Promise<Article[]> {
  const files = fs.readdirSync('./cikkek');
  const articles = await Promise.all(files.map(getArticleContent));

  const sortedArticles = articles.sort(
    (a, b) => sumArticleScores(b, settings) - sumArticleScores(a, settings),
  );

  return sortedArticles.slice(page * limit, (page + 1) * limit);
}

export async function fetchArticle(id: string): Promise<Article> {
  return getArticleContent(id);
}
