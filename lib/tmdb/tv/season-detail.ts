import { cacheLife } from 'next/cache';
import { fetchTMDB } from '../tmdb';
import type { TVSeasonDetail } from '@/types';

export async function getTVSeasonDetail(
  tvId: string,
  seasonNumber: number
): Promise<TVSeasonDetail> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<TVSeasonDetail>(
    `/tv/${tvId}/season/${seasonNumber}?language=en-US&append_to_response=videos`
  );
}
