import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { hozz_létre_helyi_tárolót } from '@/tárolók/helyi';
import { alakítsd_JSON_szöveggé } from '@/utils/rendszer/fájl';

export async function értelmezz(
  cikkek: string,
  processFile: (filePath: string) => Promise<string | undefined>,
) {
  fs.readdir(cikkek, (_, files) =>
    files.forEach((file, index) =>
      processFile(path.join(cikkek, file)).then((message) =>
        hozz_létre_helyi_tárolót(
          'értelmezett_cikkek',
          'mi',
          index,
        )(
          alakítsd_JSON_szöveggé({
            szöveg: message,
          }),
        ),
      ),
    ),
  );
}
