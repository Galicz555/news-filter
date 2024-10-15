import axios, { AxiosResponse } from 'axios';
import * as cheerio from 'cheerio';
import { flow } from 'fp-ts/lib/function';
import * as fs from 'fs';

import { Alap } from './mágikus_formulák/alap';
import { Portfolio } from './mágikus_formulák/portfolio';

export type Csiribá = Alap | Portfolio;

export async function lekapar(
  url: string,
  mágikus_formula: ($: cheerio.CheerioAPI) => Promise<Csiribá>,
  fájlnév: string,
) {
  const dolgozd_fel = flow(
    hívd_le_az_oldalt_axiossal,
    szedd_ki_az_axiosból_a_htmlt,
    töltsd_be_a_htmlt_cheerioval,
    (csiribu) => csiribá(csiribu, mágikus_formula),
    (adat) => írj_jsont(adat, fájlnév),
  );

  await dolgozd_fel(url);
}

const hívd_le_az_oldalt_axiossal = async (url: string): Promise<AxiosResponse<any, any>> =>
  await axios.get(url);

const szedd_ki_az_axiosból_a_htmlt = async (
  válasz: Promise<AxiosResponse<any, any>>,
): Promise<string> => (await válasz).data;

const töltsd_be_a_htmlt_cheerioval = async (html: Promise<string>): Promise<cheerio.CheerioAPI> =>
  cheerio.load(await html);

const csiribá = async (
  $: Promise<cheerio.CheerioAPI>,
  mágikus_formula: ($: cheerio.CheerioAPI) => Promise<Csiribá>,
) => mágikus_formula(await $);

const írj_jsont = async (adat: Promise<Csiribá>, fájlnév: string) =>
  fs.promises.writeFile(fájlnév, JSON.stringify(await adat, null, 2));
