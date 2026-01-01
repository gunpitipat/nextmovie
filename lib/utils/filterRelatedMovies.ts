import type { MediaMovie } from '@/types';

export function filterRelatedMovies(
  movies: MediaMovie[],
  currentId: number
): MediaMovie[] {
  return movies
    .filter((movie) => movie.id !== currentId)
    .filter((movie) => movie.release_date);
}
