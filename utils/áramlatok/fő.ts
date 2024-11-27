import { flow as egymásután } from 'fp-ts/lib/function';
import { processFile } from '@/web/mi/openai';
import { értelmezz } from '@/fő_folyamatok/értelmező';
import { írj_cikkeket } from '@/fő_folyamatok/cikkÍró';
import { tájékozódj } from '@/fő_folyamatok/tájékozódó';

export const világosodj_meg = egymásután(
  tájékozódj,
  (könyvek) => értelmezz(könyvek, processFile),
  írj_cikkeket,
);
