import { formatDateLongDMY } from './utils';
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
      fav.posterPath.length > 0 &&
      typeof fav.addedAt === 'string' &&
      fav.addedAt.length > 0 &&
      !Number.isNaN(new Date(fav.addedAt).getTime())
  );
}

export function groupFavoritesByDate(
  items: FavoriteItem[]
): [string, FavoriteItem[]][] {
  const sortedFavorites = items.toSorted(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );
  const groupedFavorites = Object.groupBy(sortedFavorites, (item) =>
    formatDateLongDMY(item.addedAt)
  );
  const favoritesEntries = Object.entries(groupedFavorites).filter(
    (entry): entry is [string, FavoriteItem[]] => Array.isArray(entry[1])
  );

  return favoritesEntries;
}

function emitFavoritesEvent() {
  window.dispatchEvent(new Event('favorites'));
}

export function addFavorite(item: FavoriteItem) {
  const favorites = readFavorites();

  const exists = favorites.some(
    (fav) => fav.id === item.id && fav.mediaType === item.mediaType
  );

  if (exists) return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify([item, ...favorites]));
  emitFavoritesEvent();
}

export function removeFavorite(id: number, mediaType: MediaType) {
  const favorites = readFavorites();

  const updated = favorites.filter(
    (fav) => !(fav.id === id && fav.mediaType === mediaType)
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  emitFavoritesEvent();
}

export function isFavorite(id: number, mediaType: MediaType): boolean {
  const favorites = readFavorites();

  return favorites.some((fav) => fav.id === id && fav.mediaType === mediaType);
}
