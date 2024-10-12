import * as cheerio from 'cheerio';

import { gyűjtsd_ki_és_fertőtlenítsd_őket } from '../../utils/áramlatok/csiribu';

export type Alap = {
  főcímek: string[];
  szöveg: string[];
  fájlnév: string;
};

export const alap = async ($: cheerio.CheerioAPI) => {
  const főcímek = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'h1');
  const szöveg = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'p');
  return {
    főcímek,
    szöveg,
    fájlnév: 'alap.json',
  };
};
