import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import FavoriteButton from '../FavoriteButton';
import type { Genre } from '@/types';

interface DetailHeaderProps {
  imageBaseUrl: string;
  posterPath: string;
  backdropPath: string;
  title: string;
  directors?: string[];
  creators?: string[];
  releaseYear: string;
  status?: string;
  runtime?: string;
  seasonCount?: number;
  episodeCount?: number;
  voteAverage: string;
  voteCount: string;
  genres: Genre[];
}

const DetailHeader = ({
  imageBaseUrl,
  posterPath,
  backdropPath,
  title,
  directors,
  creators,
  releaseYear,
  status,
  runtime,
  seasonCount,
  episodeCount,
  voteAverage,
  voteCount,
  genres,
}: DetailHeaderProps) => {
  const posterUrl = `${imageBaseUrl}w342${posterPath}`;
  const backdropUrl = `${imageBaseUrl}original${backdropPath}`;

  return (
    <div className="max-w-layout flex w-full flex-col items-center">
      {/* Decorative Backdrop - enhances color under mask */}
      <div className="pointer-events-none absolute top-14 -z-2 hidden aspect-video max-h-[65vh] w-7xl mask-x-from-80% mask-b-from-40% xl:block">
        <Image
          src={backdropUrl}
          alt=""
          fill
          sizes="(max-width: 1279px) 0px, 1280px"
          quality={50}
          draggable={false}
          className="image-cover"
        />
      </div>

      {/* Backdrop */}
      <div className="relative -z-1 aspect-video max-h-[60vh] w-full max-w-7xl lg:max-h-[65vh] xl:mask-x-from-80%">
        <Image
          src={backdropUrl}
          alt={`${title} backdrop`}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          draggable={false}
          className="image-cover"
        />
        <div className="gradient-overlay bottom-0 left-0 h-[50%] w-full bg-linear-to-b lg:h-[60%]" />
      </div>

      <div className="px-content max-w-content -mt-14 flex w-full flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 lg:-mt-28">
        <div className="flex items-center gap-4">
          {/* Poster */}
          <div className="relative aspect-2/3 w-30 flex-none overflow-hidden rounded-lg">
            <Image
              src={posterUrl}
              alt={`${title} poster`}
              fill
              sizes="120px"
              draggable={false}
              className="image-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-1">
            <h1 className="text-highlight text-2xl font-bold wrap-break-word max-[375px]:text-xl lg:text-3xl">
              {title}
            </h1>

            {directors && directors.length > 0 && (
              <h2>
                <span className="text-secondary text-sm lg:text-base">
                  Directed by{' '}
                </span>
                <span className="text-base font-medium lg:text-lg">
                  {directors.join(', ')}
                </span>
              </h2>
            )}

            {creators && creators.length > 0 && (
              <h2>
                <span className="text-secondary text-sm lg:text-base">
                  Created by{' '}
                </span>
                <span className="text-base font-medium lg:text-lg">
                  {creators.join(', ')}
                </span>
              </h2>
            )}

            <p className="text-secondary text-sm lg:text-base">
              <span>{releaseYear}</span>
              {status && <span> ({status})</span>}
              {runtime && (
                <span className="whitespace-nowrap"> •&nbsp;{runtime}</span>
              )}
              {seasonCount && seasonCount > 0 && (
                <span>
                  {' '}
                  •&nbsp;{seasonCount}&nbsp;season{seasonCount === 1 ? '' : 's'}
                </span>
              )}
              {episodeCount && episodeCount > 0 && (
                <span>
                  {' '}
                  •&nbsp;{episodeCount}&nbsp;episode
                  {episodeCount === 1 ? '' : 's'}
                </span>
              )}
            </p>

            <p className="text-muted text-sm lg:text-base">
              {genres.map((genre) => genre.name).join(' | ')}
            </p>

            <p className="mt-1 flex items-center gap-1 text-sm font-medium lg:text-base">
              <FaStar className="text-highlight" />
              <span>{voteAverage}</span>
              <span>({voteCount})</span>
            </p>
          </div>
        </div>

        <FavoriteButton className="favorite-cta" withIcon />
      </div>
    </div>
  );
};

export default DetailHeader;
