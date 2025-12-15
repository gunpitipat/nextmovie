import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { PaginatedResponse, Movie, TVSeries } from '@/types';

export async function getMoviesByGenre(
  genreId: number,
  page = 1
): Promise<PaginatedResponse<Movie>> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<PaginatedResponse<Movie>>(
    `/discover/movie?with_genres=${genreId}&page=${page}&include_adult=false&language=en-US&sort_by=popularity.desc`
  );
}

export async function getTVSeriesByGenre(
  genreId: number,
  page = 1
): Promise<PaginatedResponse<TVSeries>> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<PaginatedResponse<TVSeries>>(
    `/discover/tv?with_genres=${genreId}&page=${page}&include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc`
  );
}
