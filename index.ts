import { hozz_létre_helyi_tárolót as és_tárold_el } from '@/tárolók/helyi';
import { világosodj_meg } from './utils/áramlatok/fő';

try {
  világosodj_meg(és_tárold_el);
  console.log('Sikeresen lefutott a program.');
} catch (err) {
  console.error(err);
}
