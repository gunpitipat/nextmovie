import type { MediaType } from './media';

export type FavoriteItem = {
  mediaType: MediaType;
  id: number;
  title: string;
  releaseYear: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
  addedAt: string;
};
