import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { próbáld_meg } from '@/utils/kérések/próbál';
import { tépd_ki_az_oldalakat } from '@/web/felderítés/rssFolyamok';
import { lekapar as lekaparni } from '@/web/kaparó';
// import { alap } from './web/mágikus_formulák/alap';
import { portfolio } from '@/web/mágikus_formulák/portfolio';

const könyvtár = [
  {
    könyv: 'https://www.portfolio.hu/rss/all.xml',
    mágikus_formula: portfolio,
    tároló: hozz_létre_helyi_tárolót,
  },
  // {
  //   könyv: 'https://www.portfolio.hu/rss/all.xml',
  //   mágikus_formula: alap,
  //   tároló: hozz_létre_helyi_tárolót,
  // },
];

async function tájékozódj() {
  könyvtár.forEach(async ({ könyv, mágikus_formula: mágikus_formulával, tároló: és_tárold_el }) => {
    const oldalak = await tépd_ki_az_oldalakat(könyv);

    await Promise.all(
      oldalak.map(
        async (az_oldalt, oldalszám_alapján) =>
          await próbáld_meg(
            lekaparni(mágikus_formulával, az_oldalt, és_tárold_el(oldalszám_alapján)),
          ),
      ),
    );
  });
}

try {
  tájékozódj();
  console.log('Sikeresen lefutott a program.');
} catch (err) {
  console.error(err);
}
