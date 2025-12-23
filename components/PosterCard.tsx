import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { slugify } from '@/lib/utils/slug';
import BookmarkButton from './BookmarkButton';
import CarouselLink from './carousel/CarouselLink';

interface PosterCardProps {
  mediaType: 'movie' | 'tv';
  id: number;
  title: string;
  rating: number;
  posterPath: string;
  imageBaseUrl: string;
  inCarousel?: boolean;
  from?: string;
}

const PosterCard = ({
  mediaType,
  id,
  title,
  rating,
  posterPath,
  imageBaseUrl,
  inCarousel = false,
  from,
}: PosterCardProps) => {
  const posterUrl = `${imageBaseUrl}w342${posterPath}`;
  const pathname = `/${mediaType}/${id}-${slugify(title)}`;
  const href = from ? `${pathname}?from=${encodeURIComponent(from)}` : pathname;

  const LinkWrapper = inCarousel ? CarouselLink : Link;

  return (
    <div className={inCarousel ? 'keen-slider__slide carousel-slide' : ''}>
      <div className="bg-surface-2 relative h-full w-40 overflow-hidden rounded-lg lg:w-[175px]">
        {/* Poster */}
        <LinkWrapper
          href={href}
          className="relative block aspect-2/3 w-full transition-[filter] duration-200 ease-in-out hover:brightness-105 hover:contrast-105 hover:saturate-105"
        >
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 1023px) 160px, 175px"
          />
        </LinkWrapper>

        {/* Info */}
        <div className="flex flex-col gap-1 p-2">
          <LinkWrapper
            href={href}
            className="link-hover line-clamp-2 text-sm font-semibold wrap-anywhere"
          >
            {title}
          </LinkWrapper>
          <div className="text-secondary flex items-center gap-1 text-sm">
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
