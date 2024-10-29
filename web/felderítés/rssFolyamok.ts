import axios from 'axios';
import * as cheerio from 'cheerio';

import { próbáld_meg } from '@/utils/kérések/próbál';

export const tépd_ki_az_oldalakat = async (url: string) => {
  const response = await próbáld_meg(axios.get(url));
  const data = response?.data;
  const $ = cheerio.load(data, { xmlMode: true });

  const items = $('item');
  const links: string[] = [];

  items.each((_, element) => {
    const link = $(element).find('link').text();
    links.push(link);
  });

  return links;
};
