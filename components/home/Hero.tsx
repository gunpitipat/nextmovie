import Image from 'next/image';
import DetailsButton from './DetailsButton';
import FavoriteButton from './FavoriteButton';
import type { TMDBConfig, TrendingMedia } from '@/types';

interface HeroProps {
  media: TrendingMedia;
  config: TMDBConfig;
  priority?: boolean;
}

const Hero = ({ media, config, priority }: HeroProps) => {
  const title = media.media_type === 'movie' ? media.title : media.name;
  const posterUrl = `${config.images.secure_base_url}w780${media.poster_path}`;
  const backdropUrl = `${config.images.secure_base_url}original${media.backdrop_path}`;

  return (
    <div
      className={`${priority ? 'absolute top-0 left-1/2 -translate-x-1/2' : 'relative mx-auto'} max-w-content flex h-[75dvh] w-full justify-center overflow-hidden lg:justify-end`}
    >
      <div className="relative h-full w-full max-w-[640px] lg:max-w-7xl">
        {/* Mobile Poster */}
        <Image
          src={posterUrl}
          alt={title}
          priority={priority}
          fill
          className="block object-cover object-center lg:hidden"
        />

        {/* Desktop Backdrop */}
        <Image
          src={backdropUrl}
          alt={title}
          priority={priority}
          fill
          className="hidden object-cover object-center lg:block"
        />

        {/* Gradient Overlays */}
        {/* Top */}
        <div className="gradient-overlay -top-px left-0 h-14 w-full bg-linear-to-b" />
        {/* Bottom */}
        <div className="gradient-overlay -bottom-px left-0 h-[50%] w-full bg-linear-to-t lg:h-14" />
        {/* Left */}
        <div className="gradient-overlay top-0 -left-px hidden h-full w-14 bg-linear-to-r sm:block lg:w-[50%] xl:w-[45%]" />
        {/* Right */}
        <div className="gradient-overlay top-0 -right-px hidden h-full w-14 bg-linear-to-l sm:block lg:hidden 2xl:block" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 flex w-full flex-col items-center gap-3 px-6 sm:w-lg lg:bottom-1/2 lg:left-0 lg:w-[50%] lg:translate-y-1/2 lg:items-start lg:gap-4 lg:pr-0 lg:pl-8 xl:w-[45%]">
        <h1 className="text-highlight text-center text-3xl/8 font-bold lg:text-left lg:text-[2.625rem]/11">
          {title}
        </h1>
        <p className="text-secondary text-fade-b line-clamp-3 text-sm font-medium lg:w-[80%] lg:text-base">
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
