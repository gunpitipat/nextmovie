import Image from 'next/image';
import Link from 'next/link';
import { slugify } from '@/lib/utils';

interface SearchItemProps {
  mediaType: 'movie' | 'tv';
  id: number;
  title: string;
  releaseYear: string;
  posterPath: string;
  imageBaseUrl: string;
  from: string;
  onClosePanel: () => void;
}

const SearchItem = ({
  mediaType,
  id,
  title,
  releaseYear,
  posterPath,
  imageBaseUrl,
  from,
  onClosePanel,
}: SearchItemProps) => {
  const posterUrl = `${imageBaseUrl}w92${posterPath}`;
  const pathname = `/${mediaType}/${id}-${slugify(title)}`;
  const href = `${pathname}?from=${encodeURIComponent(from)}`;

  return (
    <Link
      href={href}
      className="border-surface-3 hover:bg-surface-2 flex gap-3 border-b p-2 first:rounded-t-lg"
      onClick={onClosePanel}
    >
      <div className="relative aspect-2/3 w-12 shrink-0 overflow-hidden rounded-sm">
        <Image
          src={posterUrl}
          alt={title}
          fill
          sizes="48px"
          className="image-cover"
        />
      </div>

      <div>
        <h2 className="line-clamp-1 text-base font-medium">{title}</h2>
        <p className="text-muted mt-px text-sm">
          <span>{mediaType === 'movie' ? 'Movie' : 'TV Show'}</span>
          {releaseYear && <span> • {releaseYear}</span>}
        </p>
      </div>
    </Link>
  );
};

export default SearchItem;
