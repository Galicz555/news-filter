import { próbáld_meg as próbálj_meg } from '@/utils/kérések/próbál';
import { készíts_fájlt as készíteni_fájlt } from '@/utils/rendszer/fájl';
import { hozd_létre_a_teljes_útvonalat as ide } from '@/utils/rendszer/útvonalak';
import { nevezd_el_könyv_alapján as és_nevezd_el_könyv_alapján } from '@/utils/szövegek/elnevez';

export type HelyiMód = (json: string) => Promise<void>;

export type HelybenTároló = Tároló<HelyiMód>;

export type Tároló<T> = T;

export const hozz_létre_helyi_tárolót = (oldalszám: number) => (szöveggel: string) =>
  próbálj_meg(
    készíteni_fájlt(
      szöveggel,
      ide(
        'cikkek_könyvtára',
        `${és_nevezd_el_könyv_alapján('https://www.portfolio.hu/rss/all.xml')}_${oldalszám}.json`,
      ),
    ),
  );
