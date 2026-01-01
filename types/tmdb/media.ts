export interface BaseMedia {
  id: number;
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
  genre_ids: number[];
}

export interface TVShow extends BaseMedia {
  name: string;
  first_air_date: string;
  genre_ids: number[];
}

export interface MediaMovie extends Movie {
  media_type: 'movie';
}

export interface MediaTV extends TVShow {
  media_type: 'tv';
}

export type Media = MediaMovie | MediaTV;
