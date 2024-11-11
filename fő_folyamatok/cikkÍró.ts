import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé, olvass_fájlokat } from '@/utils/rendszer/fájl';
import fs from 'fs';
import path from 'path';

const értelmezettCikkekKönyvtárából = path.join(__dirname, '../értelmezett_cikkek');

export const írj_cikkeket = () => olvass_fájlokat(írj_cikket)(értelmezettCikkekKönyvtárából);

function írj_cikket(útvonal: string, index: number) {
  fs.readFile(útvonal, 'utf8', (_, data) => {
    const pép = dolgozd_fel_az_értelmezett_cikket(JSON.parse(data).szöveg, '¤');
    hozz_létre_helyi_tárolót(
      'új_cikkek',
      'enlightment',
      index,
    )(
      alakítsd_JSON_szöveggé({
        értékelés: pép?.értékelés ? new Map(Object.entries(pép?.értékelés)) : undefined,
        szöveg: pép?.cikkSzöveg,
      }),
    );
  });
}

function dolgozd_fel_az_értelmezett_cikket(szöveg: string, specJel: string) {
  const regex = /({[^}]*})\s*/;
  const match = szöveg.replace(new RegExp(specJel, 'g'), '"').match(regex);
  if (match) {
    const jsonString = match[1];
    try {
      const értékelés = JSON.parse(jsonString.replace(/(\w+):/g, '"$1":'));
      const cikkSzöveg = szöveg.replace(match[0], '');
      return { értékelés, cikkSzöveg };
    } catch (error) {
      console.error('Invalid JSON format:', error);
    }
  }
  return undefined;
}
