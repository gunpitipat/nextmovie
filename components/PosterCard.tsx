import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { slugify } from '@/lib/utils';
import BookmarkButton from './BookmarkButton';
import CarouselLink from './carousel/CarouselLink';
import type { SectionSpacing } from '@/types';

interface PosterCardProps {
  mediaType: 'movie' | 'tv';
  id: number;
  title: string;
  rating: number;
  posterPath: string;
  imageBaseUrl: string;
  inCarousel?: boolean;
  carouselSpacing?: SectionSpacing;
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
  carouselSpacing = 'layout',
  from,
}: PosterCardProps) => {
  const posterUrl = `${imageBaseUrl}w342${posterPath}`;
  const pathname = `/${mediaType}/${id}-${slugify(title)}`;
  const href = from ? `${pathname}?from=${encodeURIComponent(from)}` : pathname;

  const carouselPaddingX = inCarousel
    ? carouselSpacing === 'layout'
      ? 'carousel-px-layout'
      : 'carousel-px-content'
    : '';

  const LinkWrapper = inCarousel ? CarouselLink : Link;

  return (
    <div
      className={
        inCarousel
          ? `keen-slider__slide keen-slide-w-fit ${carouselPaddingX}`
          : ''
      }
    >
      <div className="bg-surface-2 relative h-full w-40 overflow-hidden rounded-lg lg:w-[175px]">
        {/* Poster */}
        <LinkWrapper
          href={href}
          className="media-hover relative block aspect-2/3 w-full"
        >
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 1023px) 160px, 175px"
            className="image-cover"
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
