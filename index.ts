import { Redis } from "@upstash/redis";
import {
  // ai_teremtés,
  ai_teremtés_induló_sztorik,
  open_api_2 } from "./web/mi/openai";
import { írj_cikkeket_2 } from "./fő_folyamatok/cikkÍró";
import { alakítsd_JSON_szöveggé } from "./utils/rendszer/fájl";

const param = process.argv[2];
const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});


// try {
//   világosodj_meg();
//   console.log('Sikeresen lefutott a program.');
// } catch (err) {
//   console.error(err);
// }

async function main() {
  try {
    if (param === 'induló_sztorik') {
      const sztorik = await Promise.all(Array.from({ length: 3 }, () => ai_teremtés_induló_sztorik()));
      await írj_cikkeket_2(Promise.resolve([sztorik]), 'bitd');
      console.log('Sikeresen létrehoztuk az induló sztorikat.');
    } else if (param === 'sztorik') {
      const basicKeys = await getKeys('bitd_*');
      const extensionKeys = await getKeys('bitd_*_folyt_*');

      if (extensionKeys.length === 0) {
        const stories = await getContent(basicKeys);
        await processStories(stories, 'bitd', 0);
      } else {
        const sortedExtensionKeys = extensionKeys.sort((a, b) => {
          const aIndex = parseInt(a.split('_').pop() as string);
          const bIndex = parseInt(b.split('_').pop() as string);
          return aIndex - bIndex;
        }).slice(-1);

        const highestIndex = parseInt(sortedExtensionKeys[0].split('_').pop() as string);
        const stories = await getContent(sortedExtensionKeys);
        await processStories(stories, 'bitd', highestIndex + 1);
      }

      console.log('Sikeresen folytattuk a sztorikat.')
    } else {
      console.log('Ismeretlen parancs.');
    }
  } catch (err) {
    console.error(err);
  }
}

async function getKeys(pattern: string): Promise<string[]> {
  return await redis.keys(pattern);
}

async function getContent(keys: string[]): Promise<string[]> {
  return await Promise.all(keys.map(async (key) => {
    const content = await redis.get(key) as { szöveg: string };
    return content ? content.szöveg : '';
  }));
}

async function processStories(stories: string[], prefix: string, index: number) {
  const results = await Promise.all(stories.map((story) => open_api_2({ szöveg: story })));
  await Promise.all(results.map(async (szöveg, idx) => {
    const tartalom = alakítsd_JSON_szöveggé({ szöveg });
    const kulcs = `${prefix}_${idx}_folyt_${index}`;
    await redis.set(kulcs, tartalom);
  }));
}


main();
