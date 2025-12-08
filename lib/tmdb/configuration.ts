import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { TMDBConfig } from '@/types';

export async function getTMDBConfig(): Promise<TMDBConfig> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<TMDBConfig>('/configuration');
}
