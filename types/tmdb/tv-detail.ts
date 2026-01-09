import type { BaseMedia, TVShow, MediaTV } from './media';
import type { Person, TVAggregateCredits } from './credits';
import type { Genre } from './genre';
import type { Company } from './company';
import type { VideoResponse } from './video';
import type { PaginatedResponse } from './pagination';

export interface TVEpisode {
  id: number;
  name: string;
  overview: string;
  air_date: string;
  episode_number: number;
  episode_type: string;
  runtime: number | null;
  season_number: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface TVSeason {
  id: number;
  name: string;
  overview: string;
  air_date: string | null;
  poster_path: string | null;
  season_number: number;
  episode_count: number;
  vote_average: number;
}

export interface TVDetail extends BaseMedia {
  name: string;
  created_by: Person[];
  first_air_date: string | null;
  last_air_date: string | null;
  last_episode_to_air: TVEpisode | null;
  next_episode_to_air: TVEpisode | null;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  seasons: TVSeason[];
  networks: Company[];
  production_companies: Company[];
  production_countries: { name: string }[];
  original_language: string; // ISO 639-1
  status: string;
  type: string;

  // Append to response
  aggregate_credits: TVAggregateCredits;
  videos: VideoResponse;
  recommendations: PaginatedResponse<MediaTV>;
  similar: PaginatedResponse<TVShow>;
}
