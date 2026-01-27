import type { FavoriteItem, MediaType } from '@/types';

const STORAGE_KEY = 'favorites';

function readFavorites(): FavoriteItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getFavorites(): FavoriteItem[] {
  const favorites = readFavorites();

  // Validate only important fields to prevent rendering crashes
  return favorites.filter(
    (fav) =>
      (fav.mediaType === 'movie' || fav.mediaType === 'tv') &&
      typeof fav.id === 'number' &&
      typeof fav.title === 'string' &&
      typeof fav.posterPath === 'string' &&
      fav.posterPath.length > 0
  );
}

export function addFavorite(item: FavoriteItem) {
  const favorites = readFavorites();

  const exists = favorites.some(
    (fav) => fav.id === item.id && fav.mediaType === item.mediaType
  );

  if (exists) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...favorites]));
}

export function removeFavorite(id: number, mediaType: MediaType) {
  const favorites = readFavorites();

  const updated = favorites.filter(
    (fav) => !(fav.id === id && fav.mediaType === mediaType)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function isFavorite(id: number, mediaType: MediaType): boolean {
  const favorites = readFavorites();

  return favorites.some((fav) => fav.id === id && fav.mediaType === mediaType);
}
