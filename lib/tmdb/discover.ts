import { cacheLife } from 'next/cache';
import { fetchTMDB } from './tmdb';
import type { PaginatedResponse, Movie, TVShow } from '@/types';

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

export async function getTVShowsByGenre(
  genreId: number,
  page = 1
): Promise<PaginatedResponse<TVShow>> {
  'use cache';
  cacheLife('days');

  return fetchTMDB<PaginatedResponse<TVShow>>(
    `/discover/tv?with_genres=${genreId}&page=${page}&include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=popularity.desc`
  );
}
