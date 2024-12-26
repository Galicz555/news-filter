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

export const hozz_létre_könyvtárt_ha_nincs = (könyvtár: string) => {
  if (!fs.existsSync(könyvtár)) {
    fs.mkdirSync(könyvtár);
  }
};

export const readFiles =
  (dir: string, prefix: string): ((process: Function) => { title: string; content: string }[]) =>
  (process: Function): { title: string; content: string }[] => {
    const files = fs.readdirSync(dir);
    return files
      .filter((file: string) => file.startsWith(prefix))
      .map((file: string) => {
        const filePath = path.join(dir, file);
        return process(fs.readFileSync(filePath, 'utf8'));
      });
  };

export const readFolder = async (dir: string) => {
  const files = fs.readdirSync(dir);
  return files;
};

export const readSpecificFiles = (
  dir: string,
  files: string[],
): { title: string; content: string }[] => {
  return files.map((file) => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    } else {
      return { title: '', content: '' };
    }
  });
};
