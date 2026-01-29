'use client';

import { useEffect, useState } from 'react';
import { addFavorite, isFavorite, removeFavorite } from '@/lib/favorites';
import type { FavoriteItem } from '@/types';

export function useFavorite(item: Omit<FavoriteItem, 'addedAt'>) {
  const { id, mediaType } = item;

  const [isFavorited, setIsFavorited] = useState(isFavorite(id, mediaType));
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const updateIsFavorited = () => {
      setIsFavorited(isFavorite(id, mediaType));
    };

    updateIsFavorited();

    window.addEventListener('favorites', updateIsFavorited);
    return () => window.removeEventListener('favorites', updateIsFavorited);
  }, [id, mediaType]);

  const toggleFavorite = () => {
    if (disabled) return;
    setDisabled(true);

    if (!isFavorited) {
      addFavorite({ ...item, addedAt: new Date().toISOString() });
    } else {
      removeFavorite(id, mediaType);
    }

    setTimeout(() => setDisabled(false), 300);
  };

  return {
    isFavorited,
    disabled,
    toggleFavorite,
  };
}
