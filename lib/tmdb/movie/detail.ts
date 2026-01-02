import { cacheLife } from 'next/cache';
import { fetchTMDB } from '../tmdb';
import type { MovieDetail } from '@/types';

export async function getMovieDetail(id: string): Promise<MovieDetail> {
  'use cache';
  cacheLife({
    stale: 5 * 60,
    revalidate: 3 * 24 * 60 * 60, // 3 days
    expire: 7 * 24 * 60 * 60,
  });

  return fetchTMDB<MovieDetail>(
    `/movie/${id}?language=en-US&append_to_response=credits,videos,recommendations,similar`
  );
}
