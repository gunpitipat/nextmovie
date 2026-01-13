import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getTVDetail, getTVSeasonDetail } from '@/lib/tmdb';
import {
  buildFromStack,
  formatReleaseYear,
  formatVoteCount,
  getTrailers,
  getTopCast,
  formatTVRoles,
  normalizeAggregateTVCrew,
  getTVKeyCrewEntries,
  getSeasonNumbers,
  getDefaultSeasonNumber,
} from '@/lib/utils';
import BackButton from '@/components/BackButton';
import DetailHeader from '@/components/details/DetailHeader';
import Overview from '@/components/details/Overview';
import Trailer from '@/components/details/Trailer';
import SeasonSection from '@/components/details/tv-season/SeasonSection';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarouselWrapper from '@/components/carousel/MediaCarouselWrapper';
import CastCard from '@/components/CastCard';
import KeyCrew from '@/components/details/KeyCrew';
import type { TMDBConfig, TVDetail, SectionSpacing } from '@/types';

async function TV({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string; from?: string }>;
}) {
  const { id } = await params;
  const tvId = id.split('-')[0];

  let config: TMDBConfig;
  let tvDetail: TVDetail;

  try {
    [config, tvDetail] = await Promise.all([
      getTMDBConfig(),
      getTVDetail(tvId),
    ]);
  } catch (err) {
    if (err instanceof Error && err.message.includes('TMDB error 404')) {
      notFound();
    }
    throw err;
  }

  const posterPath = tvDetail.poster_path;
  const backdropPath = tvDetail.backdrop_path;

  if (!posterPath || !backdropPath) notFound();

  const { season, from } = await searchParams;
  const parsedSeason = season ? Number(season) : null;

  const seasonNumbers = getSeasonNumbers(tvDetail.seasons);
  const selectedSeason =
    parsedSeason && seasonNumbers.includes(parsedSeason)
      ? parsedSeason
      : getDefaultSeasonNumber(tvDetail);

  if (!selectedSeason) notFound();

  const seasonDetail = await getTVSeasonDetail(tvId, selectedSeason);

  const fromParam = buildFromStack(`/tv/${id}?season=${selectedSeason}`, from);

  const imageBaseUrl = config.images.secure_base_url;
  const creators = tvDetail.created_by.map((creator) => creator.name);
  const firstAirYear = formatReleaseYear(tvDetail.first_air_date);
  const lastAirYear = formatReleaseYear(tvDetail.last_air_date);
  const nextAirYear = formatReleaseYear(
    tvDetail.next_episode_to_air?.air_date ?? null
  );
  const releaseYear = firstAirYear
    ? nextAirYear && nextAirYear !== firstAirYear
      ? `${firstAirYear}-${nextAirYear}`
      : lastAirYear && lastAirYear !== firstAirYear
        ? `${firstAirYear}-${lastAirYear}`
        : `${firstAirYear}`
    : '';

  const showTrailers = getTrailers(tvDetail.videos.results);
  const seasonTrailers = getTrailers(seasonDetail.videos.results);
  const uniqueKeys = new Set<string>();
  const trailers = [...seasonTrailers, ...showTrailers].filter((video) => {
    if (uniqueKeys.has(video.key)) return false;
    uniqueKeys.add(video.key);
    return true;
  });

  const topCast = getTopCast(tvDetail.aggregate_credits.cast);
  const keyCrew = getTVKeyCrewEntries(
    normalizeAggregateTVCrew(tvDetail.aggregate_credits.crew)
  );

  const sectionSpacing: SectionSpacing = 'content';

  return (
    <section
      key={selectedSeason}
      className="flex flex-col items-center gap-10 lg:gap-12"
    >
      <BackButton fallbackHref="/tv" />

      <DetailHeader
        imageBaseUrl={imageBaseUrl}
        posterPath={posterPath}
        backdropPath={backdropPath}
        title={tvDetail.name}
        creators={creators}
        releaseYear={releaseYear}
        seasonCount={tvDetail.number_of_seasons}
        episodeCount={tvDetail.number_of_episodes}
        voteAverage={tvDetail.vote_average.toFixed(1)}
        voteCount={formatVoteCount(tvDetail.vote_count)}
        genres={tvDetail.genres}
      />

      <Overview overview={tvDetail.overview} />

      {trailers.length > 0 && <Trailer videos={trailers} />}

      <SeasonSection
        selectedSeason={selectedSeason}
        seasonNumbers={seasonNumbers}
        basePath={`/tv/${id}`}
        from={fromParam}
        overview={seasonDetail.overview}
        episodes={seasonDetail.episodes}
        imageBaseUrl={imageBaseUrl}
        fallbackImagePath={backdropPath}
      />

      <CarouselSection title="Top Cast" spacing={sectionSpacing}>
        <MediaCarouselWrapper>
          {topCast.map((cast) => (
            <CastCard
              key={cast.id}
              name={cast.name}
              character={formatTVRoles(cast.roles)}
              episodeCount={cast.total_episode_count}
              profilePath={cast.profile_path}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      {keyCrew.length > 0 && (
        <KeyCrew keyCrewEntries={keyCrew} creators={creators} />
      )}
    </section>
  );
}

export default function Page({ params, searchParams }: PageProps<'/tv/[id]'>) {
  return (
    <Suspense>
      <TV params={params} searchParams={searchParams} />
    </Suspense>
  );
}
