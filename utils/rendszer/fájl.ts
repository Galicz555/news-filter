import * as fs from 'fs';

export const készíts_fájlt = async (szöveg: string, teljes_útvonal: string) => {
  console.log('készíts_fájlt', szöveg, teljes_útvonal);
  await fs.promises.writeFile(teljes_útvonal, szöveg);
};

export const alakítsd_JSON_szöveggé = (adat: unknown) => JSON.stringify(adat, null, 2);
