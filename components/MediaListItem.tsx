import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { slugify } from '@/lib/utils';
import FavoriteButton from './FavoriteButton';

interface MediaListItemProps {
  mediaType: 'movie' | 'tv';
  id: number;
  title: string;
  releaseYear: string;
  voteAverage: string;
  voteCount: string;
  posterPath: string;
  imageBaseUrl: string;
  from: string;
}

const MediaListItem = ({
  mediaType,
  id,
  title,
  releaseYear,
  voteAverage,
  voteCount,
  posterPath,
  imageBaseUrl,
  from,
}: MediaListItemProps) => {
  const posterUrl = `${imageBaseUrl}w154${posterPath}`;
  const pathname = `/${mediaType}/${id}-${slugify(title)}`;
  const href = `${pathname}?from=${encodeURIComponent(from)}`;

  return (
    <div className="border-surface-3 flex items-center gap-4 border-b pb-4">
      <Link
        href={href}
        className="media-hover relative aspect-2/3 w-18 shrink-0 overflow-hidden rounded-md"
      >
        <Image
          src={posterUrl}
          alt={title}
          fill
          sizes="72px"
          className="image-cover bg-surface-2"
        />
      </Link>

      <div className="flex w-full flex-col items-start gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href={href} className="link-hover line-clamp-1 font-semibold">
            {title}
          </Link>
          <p className="text-muted mt-1 text-sm">
            <span>{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
            {releaseYear && <span> • {releaseYear}</span>}
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-sm">
            <FaStar />
            <span>{voteAverage}</span>
            <span>({voteCount})</span>
          </p>
        </div>

        <FavoriteButton
          withIcon
          className="link-hover py-1 text-sm whitespace-nowrap"
        />
      </div>
    </div>
  );
};

export default MediaListItem;
