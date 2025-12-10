import { cacheLife } from 'next/cache';
import { fetchTMDB } from '../tmdb';
import type { PaginatedResponse, Movie } from '@/types';

export async function getPopularMovies(
  page = 1
): Promise<PaginatedResponse<Movie>> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 6 * 60 * 60, // 6 hours
    expire: 24 * 60 * 60,
  });

  return fetchTMDB<PaginatedResponse<Movie>>(
    `/movie/popular?language=en-US&page=${page}`
  );
}
