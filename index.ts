import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { próbáld_meg } from '@/utils/kérések/próbál';
import { tépd_ki_az_oldalakat } from '@/web/felderítés/rssFolyamok';
import { lekapar as lekaparni } from '@/web/kaparó';
// import { alap } from './web/mágikus_formulák/alap';
import { portfolio } from '@/web/mágikus_formulák/portfolio';
import { telex } from './web/mágikus_formulák/telex';
// import { newYorkTimes } from './web/mágikus_formulák/newYorkTimes';

const és_tárold_el = hozz_létre_helyi_tárolót;

const könyvtár = [
  {
    könyv: 'https://www.portfolio.hu/rss/all.xml',
    mágikus_formula: portfolio,
  },
  {
    könyv: 'https://www.telex.hu/rss',
    mágikus_formula: telex,
  },
  // {
  //   könyv: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  //   mágikus_formula: newYorkTimes,
  // },
  // {
  //   könyv: 'https://www.portfolio.hu/rss/all.xml',
  //   mágikus_formula: alap,
  // },
];

async function tájékozódj(
  és_tárold_el: (könyvcím: string, oldalszám: number) => (szöveggel: string) => Promise<void>,
) {
  könyvtár.forEach(async ({ könyv, mágikus_formula: mágikus_formulával }) => {
    const oldalak = await tépd_ki_az_oldalakat(könyv);

    await Promise.all(
      oldalak.map(
        async (az_oldalt, oldalszám_alapján) =>
          await próbáld_meg(
            lekaparni(mágikus_formulával, az_oldalt, és_tárold_el(könyv, oldalszám_alapján)),
          ),
      ),
    );
  });
}

try {
  tájékozódj(és_tárold_el);
  console.log('Sikeresen lefutott a program.');
} catch (err) {
  console.error(err);
}
