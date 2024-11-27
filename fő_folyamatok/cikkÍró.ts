import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

export const írj_cikkeket = async (könyvek: Promise<string[][]>) =>
  (await könyvek).forEach((könyv, index) => {
    könyv.forEach((oldal, i) => {
      írj_cikket(oldal, index * 10 + i);
    });
  });

function írj_cikket(szöveg: string, index: number) {
  const feldolgozott = dolgozd_fel_az_értelmezett_cikket(szöveg, '¤');
  hozz_létre_helyi_tárolót(
    'cikkek',
    'enlightment',
    index,
  )(
    alakítsd_JSON_szöveggé({
      értékelés: feldolgozott?.értékelés,
      szöveg: feldolgozott?.cikkSzöveg,
    }),
  );
}

function dolgozd_fel_az_értelmezett_cikket(szöveg: string, specJel: string) {
  const regex = /({[^}]*})\s*/;
  const match = szöveg.replace(new RegExp(specJel, 'g'), '"').match(regex);

  let output: {
    cikkSzöveg?: string;
    értékelés?: Record<string, number>;
  } = {};

  output.cikkSzöveg = szöveg.replace(match ? match[0] : '', '');

  if (match) {
    const jsonString = match[1];
    try {
      output.értékelés = JSON.parse(jsonString.replace(/(\w+):/g, '"$1":'));
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  }

  return output;
}
