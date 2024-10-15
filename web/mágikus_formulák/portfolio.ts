import * as cheerio from 'cheerio';

// import { gyűjtsd_ki_az_ömlesztett_szöveget } from '@/utils/csiribu/műveletek';

import {
  gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket,
  gyűjtsd_ki_és_fertőtlenítsd_őket,
} from '../../utils/áramlatok/csiribu';

export type Portfolio = {
  időpont: string[];
  főcímek: string[];
  alcímek: string[];
  szöveg: string[];
};

export const portfolio = async ($: cheerio.CheerioAPI) => {
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
