// import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: 'https://poetic-hagfish-23768.upstash.io',
  token: 'AVzYAAIjcDFkZGYzNmI2Njc2YmY0N2E2OGZhMzQwYWY1ZmVlYjFjNXAxMA',
});

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
      értékelés = JSON.parse(cleanedMatch[1].replace(/(\w+):/g, '"$1":')) as Értékelés;
    } catch (error) {
      console.error('JSON parsing error:', error);
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
