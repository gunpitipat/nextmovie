import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { PaginatedResponse, MediaMovie, MediaTV } from '@/types';

export async function getTrendingMovies(
  timeWindow: 'day' | 'week' = 'week'
): Promise<PaginatedResponse<MediaMovie>> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 12 * 60 * 60, // 12 hours
    expire: 24 * 60 * 60,
  });

  return fetchTMDB<PaginatedResponse<MediaMovie>>(
    `/trending/movie/${timeWindow}?language=en-US`
  );
}

export async function getTrendingTV(
  timeWindow: 'day' | 'week' = 'week'
): Promise<PaginatedResponse<MediaTV>> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 12 * 60 * 60,
    expire: 24 * 60 * 60,
  });

  return fetchTMDB<PaginatedResponse<MediaTV>>(
    `/trending/tv/${timeWindow}?language=en-US`
  );
}
