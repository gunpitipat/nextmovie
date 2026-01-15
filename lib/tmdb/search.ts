import { fetchTMDB } from './tmdb';
import type { PaginatedResponse, Media } from '@/types';

export async function searchMedia(
  query: string,
  page = 1
): Promise<PaginatedResponse<Media>> {
  return fetchTMDB<PaginatedResponse<Media>>(
    `/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false&language=en-US`
  );
}
