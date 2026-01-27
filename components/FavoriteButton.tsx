'use client';

import { FaPlus, FaMinus } from 'react-icons/fa6';
import { showToast } from './toast';
import { useMounted } from '@/hooks/useMounted';
import { useFavorite } from '@/hooks/useFavorite';
import type { MediaType } from '@/types';

// NOTE: Favorite data is passed down instead of being composed
// at a higher level with client-only favorite actions,
// to keep the parent components as server components.

interface FavoriteButtonProps {
  className?: string;
  withIcon?: boolean;
  mediaType: MediaType;
  id: number;
  title: string;
  releaseYear: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
}

const FavoriteButton = ({
  className,
  withIcon = false,
  mediaType,
  id,
  title,
  releaseYear,
  voteAverage,
  voteCount,
  posterPath,
}: FavoriteButtonProps) => {
  const { isFavorited, disabled, toggleFavorite } = useFavorite({
    mediaType,
    id,
    title,
    releaseYear,
    voteAverage,
    voteCount,
    posterPath,
  });

  const mounted = useMounted();

  const handleClick = () => {
    const message = !isFavorited
      ? `Added "${title}" to Favorites`
      : `Removed "${title}" from Favorites`;

    toggleFavorite();
    showToast(message);
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${disabled ? 'pointer-events-none cursor-auto' : 'pointer-events-auto cursor-pointer'} ${className ?? ''} flex items-center justify-center gap-2`}
      // pointer-events-none prevents hover effects from external classes when disabled
    >
      {withIcon && (!isFavorited ? <FaPlus /> : <FaMinus />)}
      {!isFavorited ? (
        <span>Add to Favorites</span>
      ) : (
        <span>Remove Favorite</span>
      )}
    </button>
  );
};

export default FavoriteButton;
