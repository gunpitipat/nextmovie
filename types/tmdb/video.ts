export interface Video {
  id: string;
  name: string;
  key: string;
  site: string; // e.g. 'YouTube'
  type: string; // e.g. 'Trailer' | 'Teaser' | 'Featurette' | 'Clip' | 'Behind the Scenes' | Opening Credits | Bloopers
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  results: Video[];
}
