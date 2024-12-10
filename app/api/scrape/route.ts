import { fetchVilágosodás } from '@/lib/api/fetchImageCards';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export function GET() {
  fetchVilágosodás();

  return new Response(`Hello from ${process.env.VERCEL_REGION}, scraping is triggered!`);
}
