import Image from 'next/image';
import { TMDBConfig, TrendingMedia } from '@/types';
import DetailsButton from './DetailsButton';
import FavoriteButton from './FavoriteButton';

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
      className={`${priority ? 'absolute top-0 left-1/2 -translate-x-1/2' : 'relative'} flex h-[75dvh] w-full max-w-[640px] flex-col justify-end`}
    >
      {/* Mobile Poster */}
      <Image
        src={posterUrl}
        alt={title}
        priority={priority}
        fill
        className="block object-cover object-center lg:hidden"
      />

      <div className="gradient-overlay top-0 left-0 h-14 w-full bg-linear-to-b" />
      <div className="gradient-overlay bottom-0 left-0 h-[60%] w-full bg-linear-to-t" />
      <div className="gradient-overlay top-0 right-0 hidden h-full w-14 bg-linear-to-l sm:block" />
      <div className="gradient-overlay top-0 left-0 hidden h-full w-14 bg-linear-to-r sm:block" />

      <div className="z-1 mx-auto flex w-[75%] flex-col items-center gap-3.5">
        <p className="text-2xl leading-none font-semibold">{title}</p>
        <div className="relative">
          <p className="text-secondary line-clamp-3 text-xs">
            {media.overview}
          </p>
          {/* <div className="from-black/10 via-black/5 pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-linear-to-t to-transparent" /> */}
        </div>
        <div className="flex gap-3">
          <DetailsButton />
          <FavoriteButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
