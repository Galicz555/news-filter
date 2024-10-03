import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchImageCards } from '@/lib/api/fetchImageCards';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { page = 0, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10);

  const imageCards = await fetchImageCards(pageNumber, limitNumber, new Map());
  res.status(200).json(imageCards);
}
