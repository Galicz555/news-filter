import * as cheerio from 'cheerio';

export type Csiribá<T> = T;

export const csiribá = <T>(
  $: cheerio.CheerioAPI,
  mágikus_formula: ($: cheerio.CheerioAPI) => Csiribá<T>,
) => mágikus_formula($);
