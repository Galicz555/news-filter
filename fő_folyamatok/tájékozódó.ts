import { tépd_ki_az_oldalakat } from '@/web/felderítés/rssFolyamok';
import { lekapar as kapard_le } from '@/web/kaparó';
// import { alap } from './web/mágikus_formulák/alap';
import { portfolio } from '@/web/mágikus_formulák/portfolio';
// import { telex } from '@/web/mágikus_formulák/telex';
// import { newYorkTimes } from './web/mágikus_formulák/newYorkTimes';

const könyvtár = [
  {
    könyv: 'https://www.portfolio.hu/rss/all.xml',
    mágikus_formula: portfolio,
  },
  //   {
  //     könyv: 'https://www.telex.hu/rss',
  //     mágikus_formula: telex,
  //   },
  // {
  //   könyv: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  //   mágikus_formula: newYorkTimes,
  // },
  // {
  //   könyv: 'https://www.portfolio.hu/rss/all.xml',
  //   mágikus_formula: alap,
  // },
];

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const tájékozódj = async () =>
  await Promise.all(
    könyvtár.map(
      async ({ könyv, mágikus_formula: mágikus_formulával }) =>
        await Promise.all(
          (await tépd_ki_az_oldalakat(könyv)).map(async (az_oldalt, index) => {
            await delay(index * 1000); // Introduce a delay of 1 second for each item
            return await kapard_le(mágikus_formulával, az_oldalt);
          }),
        ),
    ),
  );
