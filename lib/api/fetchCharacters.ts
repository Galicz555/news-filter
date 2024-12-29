'use server';

import { v4 as uuidv4 } from 'uuid';
import { Redis } from '@upstash/redis';
import * as fs from 'fs';
import path from 'path';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export interface Item {
  id: string;
  title?: string;
  looks?: string;
  backstory?: string;
  motivations?: string;
  personality?: string;
  influence?: string;
  followers?: string;
  enemies?: string;
  content?: string | TrustedHTML;
  href: string;
  image?: string;
  isAlive?: boolean;
  relatedArticles?: {
    url: string;
    title: string;
  }[];
}

export async function fetchCharacterCards(type: string): Promise<Item[]> {
  const keys = await redis.keys(`${type}:*`);
  const items = await Promise.all(
    keys.map(async (key) => {
      const fileContent = await redis.get(key);
      return fileContent as Item;
    }),
  );

  return items.map((fileContent) => ({
    id: fileContent?.id ?? uuidv4(),
    title: fileContent?.title ?? 'Anonymus',
    looks: fileContent?.looks ?? '',
    backstory: fileContent?.backstory ?? '',
    motivations: fileContent?.motivations ?? '',
    personality: fileContent?.personality ?? '',
    influence: fileContent?.influence ?? '',
    followers: fileContent?.followers ?? '',
    enemies: fileContent?.enemies ?? '',
    content: fileContent?.content ?? 'I am groot',
    href: fileContent?.href ?? '#',
    image: fileContent?.image ?? '',
    isAlive: fileContent?.isAlive ?? true,
  }));
}

export async function fetchCharacter(title: string): Promise<Item> {
  const key = `character:${title}.json`;
  const fileContent = (await redis.get(key)) as Item;

  if (!fileContent) {
    return {
      id: uuidv4(),
      title: 'Anonymus',
      looks: '',
      backstory: '',
      motivations: '',
      personality: '',
      influence: '',
      followers: '',
      enemies: '',
      content: 'I am groot',
      href: '#',
      image: '',
    };
  }

  return {
    id: fileContent?.id ?? uuidv4(),
    title: fileContent?.title ?? 'Anonymus',
    looks: fileContent?.looks ?? '',
    backstory: fileContent?.backstory ?? '',
    motivations: fileContent?.motivations ?? '',
    personality: fileContent?.personality ?? '',
    influence: fileContent?.influence ?? '',
    followers: fileContent?.followers ?? '',
    enemies: fileContent?.enemies ?? '',
    content: fileContent?.content ?? 'I am groot',
    href: fileContent?.href ?? '#',
    image: fileContent?.image ?? '',
  };
}

export async function uploadFilesToRedis(dir: string) {
  const fileNames = fs.readdirSync(dir).filter((fileName) => fileName.endsWith('.json'));
  const files = fileNames.map((fileName) => {
    const filePath = path.join(dir, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    return { fileName, content: JSON.parse(content) };
  });

  await Promise.all(
    files.map(async ({ fileName, content }) => {
      await redis.set(`${fileName}`, JSON.stringify(content));
    }),
  );

  console.log('Files uploaded to Redis');
}
