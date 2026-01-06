import { cacheLife } from 'next/cache';
import { fetchTMDB } from '../tmdb';
import type { TVDetail } from '@/types';

export async function getTVDetail(id: string): Promise<TVDetail> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 3 * 24 * 60 * 60, // 3 days
    expire: 7 * 24 * 60 * 60,
  });

  return fetchTMDB<TVDetail>(
    `/tv/${id}?language=en-US&append_to_response=aggregate_credits,videos,recommendations,similar`
  );
}
