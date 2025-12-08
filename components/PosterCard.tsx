import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import BookmarkButton from './BookmarkButton';

interface PosterCardProps {
  mediaType: 'movie' | 'tv';
  id: number;
  title: string;
  rating: number;
  posterPath: string;
  imageBaseUrl: string;
  inCarousel?: boolean;
}

const PosterCard = ({
  mediaType,
  id,
  title,
  rating,
  posterPath,
  imageBaseUrl,
  inCarousel,
}: PosterCardProps) => {
  const posterUrl = `${imageBaseUrl}w342${posterPath}`;

  return (
    <div className={inCarousel ? 'keen-slider__slide carousel-slide' : ''}>
      <div className="bg-surface-2 relative h-full w-40 overflow-hidden rounded-lg lg:w-[175px]">
        {/* Poster */}
        <Link
          href="/"
          className="relative block aspect-2/3 w-full transition-[filter] duration-200 ease-in-out hover:brightness-105 hover:contrast-105 hover:saturate-105"
        >
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 1023px) 160px, 175px"
          />
        </Link>

        {/* Info */}
        <div className="flex flex-col gap-1 p-2 text-sm">
          <Link
            href="/"
            className="hover:text-highlight hover:decoration-primary line-clamp-2 font-semibold wrap-anywhere underline decoration-transparent underline-offset-2 transition-colors duration-200 ease-in-out"
          >
            {title}
          </Link>
          <div className="text-secondary flex items-center gap-1">
            <FaStar />
            {rating.toFixed(1)}
          </div>
        </div>

        <BookmarkButton />
      </div>
    </div>
  );
};

export default PosterCard;
