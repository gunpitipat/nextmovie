import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { Collection } from '@/types';

export async function getCollection(collectionId: number): Promise<Collection> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 3 * 24 * 60 * 60, // 3 days
    expire: 7 * 24 * 60 * 60,
  });

  return fetchTMDB<Collection>(`/collection/${collectionId}?language=en-US`);
}
