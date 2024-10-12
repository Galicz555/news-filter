import * as cheerio from 'cheerio';

export const gyűjtsd_ki = ($: cheerio.CheerioAPI, selector: string): string[] => {
  return $(selector)
    .map((_, el) => $(el).text())
    .get();
};

export const gyűjtsd_ki_célzottan = (
  $: cheerio.CheerioAPI,
  selector: string,
  cél: string,
): string[] => {
  return $(selector)
    .filter((_, el) => $(el).closest(cél).length > 0)
    .map((_, el) => $(el).text())
    .get();
};
