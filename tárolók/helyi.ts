import { próbáld_meg as próbálj_meg } from '@/utils/kérések/próbál';
import { készíts_fájlt as készíteni_fájlt } from '@/utils/rendszer/fájl';
import { hozd_létre_a_teljes_útvonalat as ide } from '@/utils/rendszer/útvonalak';

export type HelyiMód = (json: string) => Promise<void>;

export type HelybenTároló = Tároló<HelyiMód>;

export type Tároló<T> = T;

export const hozz_létre_helyi_tárolót =
  (könyvtár: string, könyvcím: string, oldalszám: number) => (szöveggel: string) =>
    próbálj_meg(készíteni_fájlt(szöveggel, ide(könyvtár, `${könyvcím}_${oldalszám}.json`)));
