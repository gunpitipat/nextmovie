import { cacheLife } from 'next/cache';
import { fetchTMDB } from '../tmdb';
import type { PaginatedResponse, TVShow } from '@/types';

export async function getOnTheAirTV(
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 6 * 60 * 60, // 6 hours
    expire: 24 * 60 * 60,
  });

  return fetchTMDB<PaginatedResponse<TVShow>>(
    `/tv/on_the_air?language=en-US&page=${page}`
  );
}
