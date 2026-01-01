import type { Movie } from '@/types';

export function sortSimilarMovies(movies: Movie[]): Movie[] {
  return movies.toSorted((a, b) => {
    const scoreA = a.vote_average * Math.log10(a.vote_count + 1);
    const scoreB = b.vote_average * Math.log10(b.vote_count + 1);
    return scoreB - scoreA;
  });
}
