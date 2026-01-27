'use client';

import { useState } from 'react';
import { addFavorite, isFavorite, removeFavorite } from '@/lib/favorites';
import type { FavoriteItem } from '@/types';

export function useFavorite(item: Omit<FavoriteItem, 'addedAt'>) {
  const { id, mediaType } = item;

  const [isFavorited, setIsFavorited] = useState(isFavorite(id, mediaType));
  const [disabled, setDisabled] = useState(false);

  const toggleFavorite = () => {
    if (disabled) return;
    setDisabled(true);

    if (!isFavorited) {
      addFavorite({ ...item, addedAt: new Date().toISOString() });
      setIsFavorited(true);
    } else {
      removeFavorite(id, mediaType);
      setIsFavorited(false);
    }

    setTimeout(() => setDisabled(false), 300);
  };

  return {
    isFavorited,
    disabled,
    toggleFavorite,
  };
}
