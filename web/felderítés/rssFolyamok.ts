import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchRSSFeed = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data, { xmlMode: true });

    const items = $('item');
    const links: string[] = [];

    items.each((index, element) => {
      const link = $(element).find('link').text();
      links.push(link);
    });

    return links;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
};
