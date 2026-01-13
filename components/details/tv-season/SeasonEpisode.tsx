import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

interface SeasonEpisodeProps {
  imageBaseUrl: string;
  stillPath: string | null;
  fallbackPath: string;
  episodeNumber: number;
  title: string;
  airDate: string;
  runtime: string;
  overview: string;
  voteAverage: string;
  voteCount: string;
}

const SeasonEpisode = ({
  imageBaseUrl,
  stillPath,
  fallbackPath,
  episodeNumber,
  title,
  airDate,
  runtime,
  overview,
  voteAverage,
  voteCount,
}: SeasonEpisodeProps) => {
  const stillUrl = `${imageBaseUrl}w780${stillPath ?? fallbackPath}`;

  return (
    <div className="border-surface-3 flex flex-col gap-3 border-b py-5 sm:flex-row sm:gap-4">
      <div className="relative mt-1 aspect-video w-full flex-none self-start overflow-hidden rounded-lg sm:w-45 lg:w-50 xl:w-55">
        <Image
          src={stillUrl}
          alt={`Episode ${episodeNumber}: ${title}`}
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 180px, (max-width: 1279px) 200px, 220px"
          className="image-cover"
        />
      </div>

      <div>
        <h3 className="text-base font-semibold">
          {episodeNumber}. {title}
        </h3>

        <p className="text-muted text-sm">
          {airDate && <span>{airDate}</span>}
          {airDate && runtime && ' • '}
          {runtime && <span>{runtime}</span>}
        </p>

        {overview && (
          <p className="text-secondary mt-2 line-clamp-5 text-sm">{overview}</p>
        )}

        {voteAverage && voteCount && (
          <div className="mt-2 flex items-center gap-1 text-sm font-medium">
            <FaStar className="text-highlight" />
            <span>{voteAverage}</span>
            <span>({voteCount})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonEpisode;
