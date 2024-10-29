import { flow as egymásután } from 'fp-ts/lib/function';
import { szedd_ki_a_felesleges_szóközöket, szedd_ki_a_sortöréseket } from '../szövegek/fertőtlenít';

export const tisztítsd_meg_a_szöveget = egymásután(
  szedd_ki_a_sortöréseket,
  szedd_ki_a_felesleges_szóközöket,
);
