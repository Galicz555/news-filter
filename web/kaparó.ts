import * as cheerio from 'cheerio';
import { flow as egymásután } from 'fp-ts/lib/function';

import { Csiribá, csiribá } from '@/utils/csiribu/csiribá';
import { töltsd_be_a_htmlt_cheerioval as majd_töltsd_be_a_htmlt_cheerioval } from '@/utils/csiribu/műveletek';
import { hívd_le_az_oldalt_axiossal } from '@/utils/kérések/szerez';
import { szedd_ki_a_válaszból_az_adatot } from '@/utils/kérések/általános';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

export async function lekapar<T>(
  mágikus_formula: ($: cheerio.CheerioAPI) => Csiribá<T>,
  oldal: string,
) {
  const a_választ = await hívd_le_az_oldalt_axiossal(oldal);

  const dolgozd_fel = egymásután(
    szedd_ki_a_válaszból_az_adatot,
    majd_töltsd_be_a_htmlt_cheerioval,
    (csiribu) => csiribá(csiribu, mágikus_formula),
    alakítsd_JSON_szöveggé,
  );

  return dolgozd_fel(a_választ);
}
