import { próbáld_meg as próbálj_meg } from '@/utils/kérések/próbál';
import { készíts_fájlt as készíteni_fájlt, hozz_létre_könyvtárt_ha_nincs } from '@/utils/rendszer/fájl';
import { hozd_létre_a_teljes_útvonalat as ide } from '@/utils/rendszer/útvonalak';


export type HelyiMód = (json: string) => Promise<void>;

export type HelybenTároló = Tároló<HelyiMód>;

export type Tároló<T> = T;

export const hozz_létre_helyi_tárolót =
  (könyvtár: string, könyvcím: string, oldalszám?: number) => (szöveggel: string) =>{
    console.log('könyvtár', könyvtár, könyvcím);
    hozz_létre_könyvtárt_ha_nincs(könyvtár);
    return próbálj_meg(készíteni_fájlt(szöveggel, ide(könyvtár, oldalszám ? `${könyvcím}_${oldalszám}.json` : `${könyvcím}.json`)));}
