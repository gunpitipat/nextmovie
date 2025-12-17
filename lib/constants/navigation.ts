import type { MenuItem } from '@/types';

export const NAV_ITEMS: MenuItem[] = [
  { label: 'Movies', href: '/movies' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Favorites', href: '/favorites' },
];

export const MOVIE_CATEGORIES: MenuItem[] = [
  { label: 'Popular', href: '/movies/popular' },
  { label: 'Top Rated', href: '/movies/top-rated' },
  { label: 'Now Playing', href: '/movies/now-playing' },
];

export const TV_CATEGORIES: MenuItem[] = [
  { label: 'Popular', href: '/tv/popular' },
  { label: 'Top Rated', href: '/tv/top-rated' },
  { label: 'On The Air', href: '/tv/on-the-air' },
];
