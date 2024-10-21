import path from 'path';

export const hozd_létre_a_teljes_útvonalat = (könyvtár: string, fájlnév: string) =>
  path.join(könyvtár, fájlnév);
