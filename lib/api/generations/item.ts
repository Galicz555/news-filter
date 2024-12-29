'use server';

import { createItems } from '@/web/mi/openai';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const NUMBEROFGENERATIONS = 3;

export async function runItemGeneration() {
  // first we need to check in redis what is the highest index for item:
  let highestIndex = 0;
  const keys = await redis.keys('item:*');
  for (const key of keys) {
    const index = parseInt(key.split(':')[1]);
    if (index > highestIndex) {
      highestIndex = index;
    }
  }

  const items = await Promise.all(Array.from({ length: NUMBEROFGENERATIONS }, () => createItems()));
  const processedItems = items.map((item) => {
    const process = item.text.split('\n\n');
    const title = process.shift();
    const text = process.join('\n\n');
    return {
      ...item,
      title,
      content: text,
    };
  });

  const jsons = processedItems.map((item, index) =>
    JSON.stringify({
      title: item?.title,
      image: item?.imageUrl,
      content: item?.text,
      href: `/items/${highestIndex + index}`,
      isAlive: true,
    }),
  );

  for (let i = 0; i < jsons.length; i++) {
    await redis.set(`item:${i}.json`, jsons[i]);
  }

  console.log('Sikeresen lefutott a program.');
}
