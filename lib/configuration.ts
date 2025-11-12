import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { TMDBConfiguration } from '@/types/tmdb';

export async function getTMDBConfiguration(): Promise<TMDBConfiguration> {
  'use cache';
  cacheLife('days');
  return fetchTMDB<TMDBConfiguration>('/configuration');
}
