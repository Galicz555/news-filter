import { próbáld_meg } from '@/utils/kérések/próbál';
import { tépd_ki_az_oldalakat } from '@/web/felderítés/rssFolyamok';
import { lekapar as lekaparni } from '@/web/kaparó';
import { nevezd_el_könyv_alapján as és_nevezd_el_könyv_alapján } from '@/utils/szövegek/elnevez';
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

export async function tájékozódj(
  és_tárold_el: (
    könyvtár: string,
    könyvcím: string,
    oldalszám: number,
  ) => (szöveggel: string) => Promise<void>,
) {
  könyvtár.forEach(async ({ könyv, mágikus_formula: mágikus_formulával }) => {
    const oldalak = await tépd_ki_az_oldalakat(könyv);

    await Promise.all(
      oldalak.map(
        async (az_oldalt, oldalszám_alapján) =>
          await próbáld_meg(
            lekaparni(
              mágikus_formulával,
              az_oldalt,
              és_tárold_el('cikkek', és_nevezd_el_könyv_alapján(könyv), oldalszám_alapján),
            ),
          ),
      ),
    );
  });
}
