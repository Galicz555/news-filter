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

export const gyűjtsd_ki_a_sorokat_ömlesztve = ($: cheerio.CheerioAPI, cél: string) => {
  return $(cél)
    .contents()
    .map((_, el) => $(el).text())
    .get();
};

export const töröld_ami_ezek_alatt_van = ($: cheerio.CheerioAPI, cél: string[]) => {
  cél.forEach((cél) => $(cél).remove());

  return $;
};
