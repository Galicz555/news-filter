import 'dotenv/config';

export const értelmezz = async (
  könyvek: Promise<string[][]>,
  processFile: (item: { szöveg: string }) => Promise<string>,
) =>
  await Promise.all(
    (await könyvek).map(
      async (oldalak) =>
        await Promise.all(oldalak.map(async (oldal) => await processFile({ szöveg: oldal }))),
    ),
  );
