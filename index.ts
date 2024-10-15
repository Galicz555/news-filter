import * as cheerio from 'cheerio';

import { fetchRSSFeed } from './web/felderítés/rssFolyamok';
import { Csiribá, lekapar } from './web/kaparó';
import { alap } from './web/mágikus_formulák/alap';
import { portfolio } from './web/mágikus_formulák/portfolio';

const rssUrl = 'https://www.portfolio.hu/rss/all.xml';
fetchRSSFeed(rssUrl).then((links) => {
  console.log('Extracted links:', links);
});

// Get the URL from command-line arguments
const url = process.argv[2];

if (!url) {
  console.error('Adj meg egy URL-t!');
  process.exit(1);
}

const portfolioOldal = (url: string) => url.includes('portfolio.hu');

const mágikus_formula = (url: string): (($: cheerio.CheerioAPI) => Promise<Csiribá>) =>
  portfolioOldal(url) ? portfolio : alap;

async function processRssFeed(rssUrl: string) {
  const regex = /www\.([^\.]+)\./;
  const találat = url.match(regex);
  const fájlnév = találat ? `${találat[1]}.json` : 'ismeretlen.json';

  try {
    const links = await fetchRSSFeed(rssUrl);
    await Promise.all(
      links.map(async (link, index) => {
        const formula = mágikus_formula(link);
        await lekapar(link, formula, `${fájlnév}_${index}.json`);
      }),
    );
    console.log('Kész!');
  } catch (error) {
    console.error('Hiba:', error);
  }
}

processRssFeed(rssUrl);
