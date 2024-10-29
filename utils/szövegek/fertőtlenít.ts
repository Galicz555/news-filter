import { map } from 'fp-ts/Array';

export const fertőtlenítsd = (szöveg: string): string => szöveg.trim();

export const fertőtlenítsd_őket = map(fertőtlenítsd);

export const szedd_ki_a_sortöréseket = (str: string) => str.replace(/\n/g, '').trim();

export const szedd_ki_a_felesleges_szóközöket = (str: string) => str.replace(/\s\s+/g, ' ');

export const ha_nincs_szöveg = (str: string) => str.length > 0;
