import type { BaseMedia, Movie } from './media';
import type { Genre } from './genre';
import type { Credits } from './credits';
import type { VideoResponse } from './video';
import type { PaginatedResponse } from './pagination';

export interface MovieDetail extends BaseMedia {
  title: string;
  runtime: number;
  release_date: string;
  genres: Genre[];
  status: string; // e.g. 'Released'
  budget: number;
  revenue: number;
  production_companies: { name: string; logo_path: string | null }[];
  production_countries: { name: string }[];
  original_language: string; // ISO 639-1
  belongs_to_collection: {
    id: number;
    name: string;
  } | null;

  // Append to response
  credits: Credits;
  videos: VideoResponse;
  similar: PaginatedResponse<Movie>;
}
