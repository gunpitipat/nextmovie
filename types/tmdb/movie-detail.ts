import type { BaseMedia, Movie, MediaMovie } from './media';
import type { Genre } from './genre';
import type { Company } from './company';
import type { MovieCredits } from './credits';
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
  production_companies: Company[];
  production_countries: { name: string }[];
  original_language: string; // ISO 639-1
  belongs_to_collection: {
    id: number;
    name: string;
  } | null;

  // Append to response
  credits: MovieCredits;
  videos: VideoResponse;
  recommendations: PaginatedResponse<MediaMovie>;
  similar: PaginatedResponse<Movie>;
}
