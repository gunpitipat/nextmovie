export interface BaseMedia {
  id: number;
  genre_ids: number[];
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface Movie extends BaseMedia {
  title: string;
  release_date: string;
}

export interface TVSeries extends BaseMedia {
  name: string;
  first_air_date: string;
}

export interface TrendingMovie extends Movie {
  media_type: 'movie';
}

export interface TrendingTV extends TVSeries {
  media_type: 'tv';
}

export type TrendingMedia = TrendingMovie | TrendingTV;
