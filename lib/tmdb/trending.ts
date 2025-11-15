import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { PaginatedResponse, TrendingMedia } from '@/types';

export async function getTrendingAll(
  timeWindow: 'day' | 'week' = 'week'
): Promise<PaginatedResponse<TrendingMedia>> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 4 * 60 * 60, // 4 hours
    expire: 24 * 60 * 60,
  });
  return fetchTMDB<PaginatedResponse<TrendingMedia>>(
    `/trending/all/${timeWindow}?language=en-US`
  );
}
