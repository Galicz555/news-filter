'use server';

import { main } from '@/index';

export async function runStoryGeneration() {
  await main();
}
