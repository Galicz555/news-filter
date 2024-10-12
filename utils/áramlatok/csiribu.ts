import { flow } from 'fp-ts/lib/function';

import { gyűjtsd_ki, gyűjtsd_ki_célzottan } from '../csiribu/műveletek';
import { fertőtlenítsd_őket } from '../szövegek/fertőtlenít';

export const gyűjtsd_ki_és_fertőtlenítsd_őket = flow(gyűjtsd_ki, fertőtlenítsd_őket);

export const gyűjtsd_ki_célzottan_és_fertőtlenítsd_őket = flow(
  gyűjtsd_ki_célzottan,
  fertőtlenítsd_őket,
);
