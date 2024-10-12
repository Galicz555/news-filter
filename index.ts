import * as cheerio from 'cheerio';

import { Csiribá, lekapar } from './web/kaparó';
import { alap } from './web/mágikus_formulák/alap';
import { portfolio } from './web/mágikus_formulák/portfolio';

// Get the URL from command-line arguments
const url = process.argv[2];

if (!url) {
  console.error('Adj meg egy URL-t!');
  process.exit(1);
}

const portfolioOldal = url.includes('portfolio.hu');

const mágikus_formula: ($: cheerio.CheerioAPI) => Promise<Csiribá> =
  !portfolioOldal ? alap : portfolio;

lekapar(url, mágikus_formula)
  .then(() => {
    console.log('Kész!');
  })
  .catch((error) => {
    if (error.status === 404) console.error('Nincs ilyen oldal!');
    else console.error('Hiba:', error);
  });
