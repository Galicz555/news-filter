import 'dotenv/config';

export const értelmezz = async (
  könyvek: Promise<string[][]>,
  ai_feldolgozó: (item: { szöveg: string }) => Promise<string>,
) =>
  await Promise.all(
    (await könyvek).map(
      async (oldalak) =>
        await Promise.all(oldalak.map(async (oldal) => await ai_feldolgozó({ szöveg: oldal }))),
    ),
  );
