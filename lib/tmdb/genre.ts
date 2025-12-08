import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { GenreResponse } from '@/types';

export async function getGenres(
  mediaType: 'movie' | 'tv'
): Promise<GenreResponse> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<GenreResponse>(`/genre/${mediaType}/list?language=en-US`);
}
