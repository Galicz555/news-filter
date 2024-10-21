import * as cheerio from 'cheerio';

import { Csiribá } from '@/utils/csiribu/csiribá';

import { gyűjtsd_ki_és_fertőtlenítsd_őket } from '../../utils/áramlatok/csiribu';

export type AlapAdat = {
  főcímek: string[];
  szöveg: string[];
};

export type Alap = Csiribá<AlapAdat>;

export const alap = ($: cheerio.CheerioAPI): Alap => {
  const főcímek = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'h1');
  const szöveg = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'p');
  return {
    főcímek,
    szöveg,
  };
};
