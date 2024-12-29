'use server';

import { v4 as uuidv4 } from 'uuid';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export interface Item {
  id: string;
  title?: string;
  content?: string | TrustedHTML;
  href: string;
  image?: string;
  isAlive?: boolean;
}

export async function fetchItemCards(type: string): Promise<Item[]> {
  const keys = await redis.keys(`${type}:*`);
  const items = await Promise.all(
    keys.map(async (key) => {
      const fileContent = await redis.get(key);
      return fileContent as Item;
    }),
  );

  return items.map((fileContent) => ({
    id: fileContent?.id ?? uuidv4(),
    title: fileContent?.title ?? 'Thing',
    content: fileContent?.content ?? 'I am groot',
    href: fileContent?.href ?? '#',
    image: fileContent?.image ?? '',
    isAlive: fileContent?.isAlive ?? true,
  }));
}

export async function fetchItem(title: string): Promise<Item> {
  const key = `item:${title}.json`;
  const fileContent = (await redis.get(key)) as Item;

  if (!fileContent) {
    return {
      id: uuidv4(),
      title: 'Thing',
      content: 'I am groot',
      href: '#',
      image: '',
    };
  }

  return {
    id: fileContent?.id ?? uuidv4(),
    title: fileContent?.title ?? 'Thing',
    content: fileContent?.content ?? 'I am groot',
    href: fileContent?.href ?? '#',
    image: fileContent?.image ?? '',
  };
}
