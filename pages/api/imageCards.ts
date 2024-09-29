import type { NextApiRequest, NextApiResponse } from 'next';

const fetchImageCards = async (page: number, limit: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array.from({ length: limit }, (_, i) => ({
    id: page * limit + i + 1,
    title: `Beautiful Landscape ${page * limit + i + 1}`,
    href: `article/${i + 1}`,
    image: `/placeholder.jpeg`,
  }));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { page = 0, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const imageCards = await fetchImageCards(pageNumber, limitNumber);
  res.status(200).json(imageCards);
}
