import { ai_teremtés_induló_sztorik, ai_teremtés_folytató_sztorik } from './web/mi/openai';
import {
  alakítsd_JSON_szöveggé,
  readFiles,
  readFolder,
  readSpecificFiles,
} from './utils/rendszer/fájl';
import { hozz_létre_helyi_tárolót } from './tárolók/helyi';

const param = process.argv[2];
const NUMBEROFGENERATIONS = 10;
const BITD_FOLDER_TO_READ = './bitd';
const BITD_FODLER_TO_WRITE = 'bitd';
const STORY_PREFIX = 'bitd:story';
const FOLYT_SUFFIX = '_folyt_';

// try {
//   világosodj_meg();
//   console.log('Sikeresen lefutott a program.');
// } catch (err) {
//   console.error(err);
// }

export async function main() {
  try {
    if (param === 'induló_sztorik') {
      const sztorik = await Promise.all(
        Array.from({ length: NUMBEROFGENERATIONS }, () => ai_teremtés_induló_sztorik()),
      );
      await processStoriesStart(sztorik, BITD_FODLER_TO_WRITE);
    } else if (param === 'sztorik') {
      const files = await readFolder(BITD_FOLDER_TO_READ);
      const folytFiles = files.filter((file: string) => file.includes(FOLYT_SUFFIX));

      if (folytFiles.length === 0) {
        await processStories(
          readFiles(BITD_FOLDER_TO_READ, STORY_PREFIX)(JSON.parse),
          STORY_PREFIX,
          new Array(NUMBEROFGENERATIONS).fill(0),
        );
      } else {
        const highestExtensions = getHighestFilteredExtensions(groupFilesByPrefix(files));
        const highestLastIndexForStory = highestExtensions
          .filter((key) => key.includes(FOLYT_SUFFIX))
          .map((key) => parseInt(key.split('_').pop()!.split('.')[0]));

        const stories = readSpecificFiles(BITD_FOLDER_TO_READ, highestExtensions);
        await processStories(stories, STORY_PREFIX, highestLastIndexForStory);
      }

      console.log('Sikeresen folytattuk a sztorikat.');
    } else {
      console.log('Ismeretlen parancs.');
    }
  } catch (err) {
    console.error(err);
  }
}

function getHighestFilteredExtensions(groupedExtensions: { [key: string]: string[] }) {
  return Object.values(groupedExtensions)
    .map((group) => {
      return group.sort((a, b) => {
        const aIndex = parseInt(a.split('_').pop()!.split('.')[0]);
        const bIndex = parseInt(b.split('_').pop()!.split('.')[0]);
        return bIndex - aIndex;
      })[0];
    })
    .filter((key) => key.includes(FOLYT_SUFFIX));
}

function groupFilesByPrefix(files: string[]): { [key: string]: string[] } {
  return files.reduce(
    (acc: { [x: string]: any[] }, key: string) => {
      const groupKey = key.split('_').slice(0, 2).join('_');
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(key);
      return acc;
    },
    {} as { [key: string]: string[] },
  );
}

async function processStory(szöveg: string, prefix: string, idx: number, suffix: string) {
  const feldolgozás = szöveg.split('\n\n');
  const title = feldolgozás.shift();
  const újSzöveg = feldolgozás.join('\n\n');
  const tartalom = alakítsd_JSON_szöveggé({ title, content: újSzöveg });
  const kulcs = `${prefix}${idx}${suffix}`;

  hozz_létre_helyi_tárolót(BITD_FODLER_TO_WRITE, kulcs)(tartalom);
}

async function processStoriesStart(stories: string[], prefix: string) {
  await Promise.all(
    stories.map((szöveg, idx) => processStory(szöveg, `${prefix}:story_`, idx, '')),
  );
}

async function processStories(
  stories: { title: string; content: string }[],
  prefix: string,
  index: number[],
) {
  const results = await Promise.all(
    stories.map((story) => ai_teremtés_folytató_sztorik({ szöveg: story.content })),
  );

  await Promise.all(
    results.map((szöveg, idx) =>
      processStory(szöveg, `${prefix}_`, idx, `${FOLYT_SUFFIX}${index[idx] + 1}`),
    ),
  );
}
