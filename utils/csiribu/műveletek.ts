import * as cheerio from 'cheerio';

export const töltsd_be_a_htmlt_cheerioval = (html: string) => cheerio.load(html);

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

export const gyűjtsd_ki_az_ömlesztett_szöveget = ($: cheerio.CheerioAPI, cél: string) => {
  return $(cél)
    .contents()
    .filter(
      (_, el) =>
        el.type === 'text' ||
        (el.type === 'tag' && el.tagName !== 'script' && el.tagName !== 'style'),
    )
    .map((_, el) => $(el).text().trim())
    .get()
    .filter((text) => text.length > 0)
    .join(' ');
};
