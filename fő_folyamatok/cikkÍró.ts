import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

export const írj_cikkeket = async (könyvek: Promise<string[][]>) =>
  (await könyvek).forEach((könyv, index) => {
    könyv.forEach((oldal, i) => írj_cikket(dolgozd_fel_az_oldalt(oldal, '¤'), index * 10 + i));
  });

const írj_cikket = (
  szöveg: { cikkSzöveg: string; értékelés: Értékelés | undefined },
  index: number,
) =>
  hozz_létre_helyi_tárolót(
    'cikkek',
    'enlightment',
    index,
  )(
    alakítsd_JSON_szöveggé({
      értékelés: szöveg?.értékelés,
      szöveg: szöveg?.cikkSzöveg,
    }),
  );

function dolgozd_fel_az_oldalt(szöveg: string, specJel: string) {
  const match = szöveg.replace(new RegExp(specJel, 'g'), '"').match(/({[^}]*})\s*/);

  return {
    cikkSzöveg: szöveg.replace(match ? match[0] : '', ''),
    értékelés: match ? (JSON.parse(match[1].replace(/(\w+):/g, '"$1":')) as Értékelés) : undefined,
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
