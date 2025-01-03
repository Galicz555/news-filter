import * as cheerio from 'cheerio';

import { Csiribá } from '@/utils/csiribu/csiribá';

import {
  gyűjtsd_ki_a_sorokat_ömlesztve,
  töröld_ami_ezek_alatt_van,
} from '@/utils/csiribu/műveletek';
import { tisztítsd_meg_a_szöveget } from '@/utils/áramlatok/szöveg';
import { ha_nincs_szöveg } from '@/utils/szövegek/fertőtlenít';
import { flow as egymásután } from 'fp-ts/lib/function';

export type PortfolioAdat = {
  szöveg: string;
};

export type Portfolio = Csiribá<PortfolioAdat>;

export const portfolio = ($: cheerio.CheerioAPI): Portfolio => {
  const dolgozd_fel = (cél: string) =>
    egymásután(
      töröld_ami_ezek_alatt_van,
      (html_sorok) => gyűjtsd_ki_a_sorokat_ömlesztve(html_sorok, cél),
      (sorok) => sorok.map(tisztítsd_meg_a_szöveget),
      (szövegek) => szövegek.filter(ha_nincs_szöveg).join(' '),
    );

  return {
    szöveg: dolgozd_fel('.pfarticle')($, [
      '.related',
      '.tags',
      '.mainimage-source',
      '.adoceanzone',
      '.event',
    ]),
  };
};
