import { map } from 'fp-ts/Array';

export const fertőtlenítsd = (szöveg: string): string => szöveg.trim();

export const fertőtlenítsd_őket = map(fertőtlenítsd);
