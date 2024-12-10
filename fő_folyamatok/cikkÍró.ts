// import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: 'AcI9AAIjcDFhY2YxMzRmMjliZDk0MWVkOTJlMTdkNzA3ODdmYzVkNnAxMA',
})

export const írj_cikkeket = async (könyvek: Promise<string[][]>) =>
  (await könyvek).forEach((könyv, index) => {
    könyv.forEach(
      async (oldal, i) => await írj_cikket(dolgozd_fel_az_oldalt(oldal, '¤'), index * 10 + i),
    );
  });

const írj_cikket = async (
  szöveg: { cikkSzöveg: string; értékelés: Értékelés | undefined },
  index: number,
) => {
  const tartalom = alakítsd_JSON_szöveggé({
    értékelés: szöveg?.értékelés,
    szöveg: szöveg?.cikkSzöveg,
  });
  console.log('tartalom:', index);
  const kulcs = `cikkek:enlightment:${index}`;
  await redis.set(kulcs, tartalom);

  // hozz_létre_helyi_tárolót(
  //   'cikkek',
  //   'enlightment',
  //   index,
  // )(
  //   alakítsd_JSON_szöveggé({
  //     értékelés: szöveg?.értékelés,
  //     szöveg: szöveg?.cikkSzöveg,
  //   }),
  // );
};

function dolgozd_fel_az_oldalt(szöveg: string, specJel: string) {
  const match = szöveg.replace(new RegExp(specJel, 'g'), '"').match(/({[^}]*})\s*/);

  let értékelés: Értékelés | undefined = undefined;
  if (match) {
    try {
      const cleanedMatch = match[1].replace(/(\w+):\s*(?=,|})/g, '');
      const formattedJSON = cleanedMatch.replace(/(\w+):/g, '"$1":');
      értékelés = JSON.parse(formattedJSON) as Értékelés;
    } catch (error) {
      console.error('JSON parsing error:', error);
      console.error('Original match:', match[1]);
    }
  }

  return {
    cikkSzöveg: szöveg.replace(match ? match[0] : '', ''),
    értékelés,
  };
}

interface Értékelés {
  jóságosság: number;
  filozófikusság: number;
  viccesség: number;
  meglepőség: number;
  alaposság: number;
  pénzügyi_haszon: number;
}
