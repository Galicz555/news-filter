// import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://light-ant-49725.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
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

export const írj_cikkeket_2 = async (könyvek: Promise<string[][]>, kulcs: string) =>
  (await könyvek).forEach((könyv, index) => {
    könyv.forEach(
      async (oldal, i) => await írj_cikket_2(dolgozd_fel_az_oldalt(oldal, '¤'),kulcs , index * 10 + i),
    );
  });

const írj_cikket_2 = async (
  szöveg: { cikkSzöveg: string; értékelés: Értékelés | undefined },
  kulcs: string,
  index: number,
) => {
  const tartalom = alakítsd_JSON_szöveggé({
    értékelés: szöveg?.értékelés,
    szöveg: szöveg?.cikkSzöveg,
  });
  const redis_kulcs = `${kulcs}_${index}`;
  await redis.set(redis_kulcs, tartalom);
};

interface Értékelés {
  jóságosság: number;
  filozófikusság: number;
  viccesség: number;
  meglepőség: number;
  alaposság: number;
  pénzügyi_haszon: number;
}

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
