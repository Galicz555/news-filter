import * as cheerio from 'cheerio';

import {
  gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket,
  gyűjtsd_ki_és_fertőtlenítsd_őket,
} from '../../utils/áramlatok/csiribu';

export type Portfolio = {
  főcímek: string[];
  alcímek: string[];
  szöveg: string[];
  fájlnév: string;
};

export const portfolio = async ($: cheerio.CheerioAPI) => {
  const főcímek = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'h1');
  const alcímek = gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket($, 'h2', 'pfarticle');
  const szöveg = gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket($, 'p', 'pfarticle');
  return {
    főcímek,
    alcímek,
    szöveg,
    fájlnév: 'portfolio.json',
  };
};
