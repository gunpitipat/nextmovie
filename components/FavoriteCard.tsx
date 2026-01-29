'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { showToast } from './toast';
import { removeFavorite } from '@/lib/favorites';
import { slugify, formatVoteCount } from '@/lib/utils';
import type { MediaType } from '@/types';

interface FavoriteCardProps {
  mediaType: MediaType;
  id: number;
  title: string;
  releaseYear: string;
  voteAverage: number;
  voteCount: number;
  posterPath: string;
  imageBaseUrl: string;
  from: string;
}

const FavoriteCard = ({
  mediaType,
  id,
  title,
  releaseYear,
  voteAverage,
  voteCount,
  posterPath,
  imageBaseUrl,
  from,
}: FavoriteCardProps) => {
  const [imageError, setImageError] = useState(false);

  const posterUrl = `${imageBaseUrl}w342${posterPath}`;
  const pathname = `/${mediaType}/${id}-${slugify(title)}`;
  const href = `${pathname}?from=${encodeURIComponent(from)}`;

  const handleRemove = () => {
    removeFavorite(id, mediaType);
    showToast(`Removed "${title}" from Favorites`);
  };

  return (
    <div className="border-surface-3 from-surface-2 to-background relative w-40 overflow-hidden rounded-lg border bg-linear-to-b lg:w-[175px]">
      <Link
        href={href}
        className="media-hover relative block aspect-2/3 w-full"
      >
        {!imageError ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 1023px) 160px, 175px"
            draggable={false}
            className="image-cover bg-surface-2"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="bg-surface-2 flex size-full items-center justify-center text-center">
            <span className="line-clamp-4 px-2 text-base font-medium">
              {title}
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-1 p-2">
        <Link
          href={href}
          className="link-hover line-clamp-2 text-sm font-semibold wrap-anywhere"
        >
          {title}
        </Link>

        <p className="text-secondary text-sm">
          <span>{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
          {releaseYear && <span> • {releaseYear}</span>}
        </p>

        <p className="text-secondary flex items-center gap-1 text-sm">
          <FaStar />
          <span>{voteAverage.toFixed(1)}</span>
          <span>({formatVoteCount(voteCount)})</span>
        </p>
      </div>

      <button
        type="button"
        onClick={handleRemove}
        className="bg-surface-2/50 absolute top-0.5 right-0.5 flex size-8 items-center justify-center rounded-full transition-[filter] duration-200 ease-in-out hover:brightness-150"
      >
        <FiX className="size-5" />
      </button>
    </div>
  );
};

export default FavoriteCard;
