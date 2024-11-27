import { flow as egymásután } from 'fp-ts/lib/function';
import { open_api as ai_feldolgozóval } from '@/web/mi/openai';
import { értelmezz as értelmezd } from '@/fő_folyamatok/értelmező';
import { írj_cikkeket } from '@/fő_folyamatok/cikkÍró';
import { tájékozódj as szedd_össze_a_könyveket } from '@/fő_folyamatok/tájékozódó';

export const világosodj_meg = egymásután(
  szedd_össze_a_könyveket,
  (a_könyveket) => értelmezd(a_könyveket, ai_feldolgozóval),
  írj_cikkeket,
);
