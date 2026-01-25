import { formatDateShort, formatRuntime, formatVoteCount } from '@/lib/utils';
import SeasonSelector from './SeasonSelector';
import SeasonEpisode from './SeasonEpisode';
import SeasonPagination from './SeasonPagination';
import type { TVEpisode } from '@/types';

interface SeasonSectionProps {
  selectedSeason: number;
  seasonNumbers: number[];
  basePath: string;
  from: string;
  overview: string;
  episodes: TVEpisode[];
  imageBaseUrl: string;
  fallbackImagePath: string;
}

const SeasonSection = ({
  selectedSeason,
  seasonNumbers,
  basePath,
  from,
  overview,
  episodes,
  imageBaseUrl,
  fallbackImagePath,
}: SeasonSectionProps) => {
  return (
    <div className="px-content max-w-content w-full">
      <div className="flex items-center gap-1">
        <h2 className="heading heading-bar">Season</h2>
        <SeasonSelector
          key={selectedSeason}
          selectedSeason={selectedSeason}
          seasonNumbers={seasonNumbers}
          basePath={basePath}
          from={from}
        />
      </div>

      <p className="text-secondary mt-3 line-clamp-5 text-sm lg:text-base">
        {overview}
      </p>

      <div className="lg:py-2">
        {episodes.map((episode) => (
          <SeasonEpisode
            key={episode.id}
            imageBaseUrl={imageBaseUrl}
            stillPath={episode.still_path}
            fallbackPath={fallbackImagePath}
            episodeNumber={episode.episode_number}
            title={episode.name}
            airDate={formatDateShort(episode.air_date)}
            runtime={formatRuntime(episode.runtime)}
            overview={episode.overview}
            voteAverage={
              episode.vote_average !== 0 ? episode.vote_average.toFixed(1) : ''
            }
            voteCount={
              episode.vote_count !== 0
                ? formatVoteCount(episode.vote_count)
                : ''
            }
          />
        ))}
      </div>

      {seasonNumbers.length > 1 && (
        <SeasonPagination
          currentSeason={selectedSeason}
          totalSeasons={seasonNumbers.length}
          basePath={basePath}
          from={from}
        />
      )}
    </div>
  );
};

export default SeasonSection;
