import * as fs from 'fs';
import path from 'path';

export const készíts_fájlt = async (szöveg: string, teljes_útvonal: string) => {
  await fs.promises.writeFile(teljes_útvonal, szöveg);
};

export const készíts_fájlokat = (szövegek: string[]) => (útvonalak: string[]) =>
  szövegek.forEach((szöveg, index) => készíts_fájlt(szöveg, útvonalak[index]));

export const alakítsd_JSON_szöveggé = (adat: unknown) => JSON.stringify(adat, null, 2);

export const olvass_fájlokat =
  (művelet: (filePath: string, index: number) => void) => (könyvtár: string) =>
    fs.readdir(könyvtár, (_, files) =>
      files.forEach((file, index) => művelet(path.join(könyvtár, file), index)),
    );
