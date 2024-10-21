import * as cheerio from 'cheerio';

import { Csiribá } from '@/utils/csiribu/csiribá';

// import { gyűjtsd_ki_az_ömlesztett_szöveget } from '@/utils/csiribu/műveletek';
import {
  gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket,
  gyűjtsd_ki_és_fertőtlenítsd_őket,
} from '../../utils/áramlatok/csiribu';

export type PortfolioAdat = {
  időpont: string[];
  főcímek: string[];
  alcímek: string[];
  szöveg: string[];
};

export type Portfolio = Csiribá<PortfolioAdat>;

export const portfolio = ($: cheerio.CheerioAPI): Portfolio => {
  const időpont = gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket($, 'time', '.d-block');
  const főcímek = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'h1');
  const alcímek = gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket($, 'h2', '.pfarticle');
  const szöveg = gyűjtsd_ki_és_fertőtlenítsd_őket($, 'p');
  // const szöveg = gyűjtsd_ki_az_ömlesztett_szöveget($, '.pfarticle', ['related', 'tags']);
  // const szöveg = gyűjtsd_ki_az_ömlesztett_szöveget($, '.pfarticle');
  return {
    időpont,
    főcímek,
    alcímek,
    szöveg,
  };
};
