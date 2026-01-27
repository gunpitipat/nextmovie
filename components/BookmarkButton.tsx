'use client';

import { FaPlus, FaMinus } from 'react-icons/fa6';
import { GoBookmarkFill, GoBookmarkSlashFill } from 'react-icons/go';
import { showToast } from './toast';
import { useMounted } from '@/hooks/useMounted';
import { useFavorite } from '@/hooks/useFavorite';
import type { MediaType } from '@/types';

// NOTE: Favorite data is passed down through PosterCard
// instead of being composed at a higher level with client-only favorite actions,
// to keep the page and PosterCard as server components.

interface BookmarkButtonProps {
  mediaType: MediaType;
  id: number;
  title: string;
  releaseYear: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
}

const BookmarkButton = ({
  mediaType,
  id,
  title,
  releaseYear,
  voteAverage,
  voteCount,
  posterPath,
}: BookmarkButtonProps) => {
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
      className={`${isFavorited ? 'opacity-90' : 'opacity-80'} ${disabled ? 'cursor-auto' : 'cursor-pointer hover:brightness-150'} absolute top-0 right-0 size-12 transition-[filter] duration-200 ease-in-out`}
    >
      <div className="absolute top-px -right-1 size-11 lg:size-12">
        {!isFavorited ? (
          <>
            <GoBookmarkFill className="text-surface-2 size-full" />
            <FaPlus className="text-highlight absolute top-1/2 left-1/2 size-4 -translate-x-1/2 -translate-y-[80%]" />
          </>
        ) : (
          <>
            <GoBookmarkSlashFill className="text-surface-2 size-full" />
            <FaMinus className="text-highlight absolute top-1/2 left-1/2 size-5 -translate-x-1/2 -translate-y-[75%]" />
          </>
        )}
      </div>
    </button>
  );
};

export default BookmarkButton;
