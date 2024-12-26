import {
  ai_teremtés_induló_sztorik,
  ai_teremtés_folytató_sztorik } from "./web/mi/openai";
import { alakítsd_JSON_szöveggé, readFiles, readFolder, readSpecificFiles } from "./utils/rendszer/fájl";
import { hozz_létre_helyi_tárolót } from "./tárolók/helyi";

const param = process.argv[2];

const NUMBEROFGENERATIONS = 10;


// try {
//   világosodj_meg();
//   console.log('Sikeresen lefutott a program.');
// } catch (err) {
//   console.error(err);
// }

async function main() {
  try {
    if (param === 'induló_sztorik') {
      const sztorik = await Promise.all(Array.from({ length: NUMBEROFGENERATIONS }, () => ai_teremtés_induló_sztorik()));
      await processStoriesStart(sztorik, 'bitd');
    } else if (param === 'sztorik') {
      const files = await readFolder('./bitd');
      const folytFiles = files.filter((file: string) => file.includes('_folyt_'));

      if (folytFiles.length === 0) {
        const stories = readFiles('./bitd', 'bitd:story')(JSON.parse);

        const arrayOfZeros = new Array(NUMBEROFGENERATIONS).fill(0);
        await processStories(stories, 'bitd:story', arrayOfZeros );
      } else {
        const groupedExtensions: { [key: string]: string[] } = files.reduce((acc: { [x: string]: any[]; }, key: string) => {
          const groupKey = key.split('_').slice(0, 2).join('_');
          if (!acc[groupKey]) {
            acc[groupKey] = [];
          }
          acc[groupKey].push(key);
          return acc;
        }, {} as { [key: string]: string[] });

        const highestExtensions = Object.values(groupedExtensions).map(group => {
          return group.sort((a, b) => {
            const aIndex = parseInt(a.split('_').pop()!.split('.')[0]);
            const bIndex = parseInt(b.split('_').pop()!.split('.')[0]);
            return bIndex - aIndex;
          })[0];
        }).filter(key => key.includes('_folyt_'));

        const highestLastIndexForStory = highestExtensions
        .filter(key => key.includes('_folyt_'))
        .map(key => parseInt(key.split('_').pop()!.split('.')[0]));

        const stories = readSpecificFiles('./bitd', highestExtensions);
        await processStories(stories, 'bitd:story', highestLastIndexForStory);
      }

      console.log('Sikeresen folytattuk a sztorikat.')
    } else {
      console.log('Ismeretlen parancs.');
    }
  } catch (err) {
    console.error(err);
  }
}

async function processStoriesStart(stories: string[], prefix: string,) {
  const results = await Promise.all(stories.map((story) => ai_teremtés_folytató_sztorik({ szöveg: story })));
  await Promise.all(results.map(async (szöveg, idx) => {
    const feldolgozás = szöveg.split('\n\n');
    const title = feldolgozás.shift();
    const újSzöveg = feldolgozás.join('\n\n');
    const tartalom = alakítsd_JSON_szöveggé({ title, content:újSzöveg });
    const kulcs = `${prefix}:story_${idx}`;
    hozz_létre_helyi_tárolót('bitd', kulcs)(tartalom);
  }));
}

async function processStories(stories: {
  title: string,
  content: string
}[], prefix: string, index: number[]) {
  const results = await Promise.all(stories.map(async(story) => {
    const res = await ai_teremtés_folytató_sztorik({ szöveg: story.content })
    return res
  }));

  await Promise.all(results.map(async (szöveg, idx) => {
    const feldolgozás = szöveg.split('\n\n');
    const title = feldolgozás.shift();
    const újSzöveg = feldolgozás.join('\n\n');
    const tartalom = alakítsd_JSON_szöveggé({ title, content: újSzöveg });
    const kulcs = `${prefix}_${idx}_folyt_${index[idx]+1}`;
    hozz_létre_helyi_tárolót('bitd', kulcs)(tartalom);
  }));
}


main();
