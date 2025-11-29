import Image from 'next/image';
import DetailsButton from './DetailsButton';
import FavoriteButton from './FavoriteButton';
import type { TrendingMedia } from '@/types';

interface HeroProps {
  media: TrendingMedia;
  imageBaseUrl: string;
  preload?: boolean;
}

const Hero = ({ media, imageBaseUrl, preload }: HeroProps) => {
  const title = media.media_type === 'movie' ? media.title : media.name;
  const posterUrl = `${imageBaseUrl}w780${media.poster_path}`;
  const backdropUrl = `${imageBaseUrl}original${media.backdrop_path}`;

  return (
    <div
      className={`${preload ? 'absolute top-0 left-1/2 -translate-x-1/2' : 'relative mx-auto'} max-w-content flex h-[70vh] w-full flex-col items-center overflow-hidden lg:h-[75vh] 2xl:pr-8`}
    >
      {/* Tablet Backdrop (decorative) */}
      <div className="absolute inset-0 hidden size-full mask-y-from-75% sm:block lg:hidden">
        <Image
          src={backdropUrl}
          alt=""
          preload={preload}
          fill
          sizes="(max-width: 640px) 0px, (max-width: 1023px) 50vw, 0px" // Use 50vw to force browser to pick a lighter backdrop (blurred and dimmed)
          quality={50}
          className="block object-cover object-center opacity-25 blur-[2px]"
        />
      </div>

      <div className="relative size-full max-w-[640px] lg:max-w-7xl lg:self-end">
        {/* Mobile Poster */}
        <Image
          src={posterUrl}
          alt={title}
          preload={preload}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1023px) 640px, 0px"
          className={`block object-cover object-center ${!preload ? 'rounded-t-2xl' : ''} lg:hidden`}
        />

        {/* Desktop Backdrop */}
        <Image
          src={backdropUrl}
          alt={title}
          preload={preload}
          fill
          sizes="(max-width: 1023px) 0px, (max-width: 1280px) 100vw, 1280px"
          className={`hidden object-cover object-center ${preload ? 'rounded-br-2xl' : 'rounded-r-2xl'} lg:block`}
        />

        {/* Gradient Overlays */}
        {/* Top */}
        {preload && (
          <div className="gradient-overlay top-0 left-0 h-14 w-full bg-linear-to-t" />
        )}
        {/* Bottom */}
        <div className="gradient-overlay bottom-0 left-0 h-[50%] w-full bg-linear-to-b lg:hidden" />
        {/* Left Linear */}
        <div className="gradient-overlay top-0 left-0 hidden h-full w-[50%] bg-linear-to-l lg:block" />
        {/* Left Radial */}
        <div className="gradient-overlay to-background/50 top-0 left-0 hidden h-full w-[50%] bg-radial-[circle_at_right] via-transparent lg:block" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 flex w-full flex-col items-center gap-3 px-6 sm:w-lg lg:bottom-1/2 lg:left-0 lg:w-[50%] lg:translate-y-1/2 lg:items-start lg:gap-4 lg:pr-0 lg:pl-8 xl:w-[45%] 2xl:w-[40%]">
        <h1 className="text-highlight text-center text-3xl/8 font-bold wrap-anywhere lg:text-left lg:text-[2.625rem]/11">
          {title}
        </h1>
        <p className="text-secondary line-clamp-3 mask-b-from-80% text-sm font-medium lg:w-[75%] lg:text-base">
          {media.overview}
        </p>
        <div className="mt-1 flex gap-3 lg:mt-2">
          <DetailsButton />
          <FavoriteButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
