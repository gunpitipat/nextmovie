import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getTVDetail, getTVSeasonDetail } from '@/lib/tmdb';
import {
  buildFromStack,
  formatReleaseYear,
  getTrailers,
  getTopCast,
  formatTVRoles,
  normalizeAggregateTVCrew,
  getTVKeyCrewEntries,
  getSeasonNumbers,
  getDefaultSeasonNumber,
  formatDateLong,
  formatLanguage,
  filterWithImages,
  sortSimilarMedia,
} from '@/lib/utils';
import ThreeDots from '@/components/loading/ThreeDots';
import SegmentRemount from '@/components/SegmentRemount';
import BackButton from '@/components/BackButton';
import DetailHeader from '@/components/details/DetailHeader';
import Overview from '@/components/details/Overview';
import Trailer from '@/components/details/Trailer';
import SeasonSection from '@/components/details/tv-season/SeasonSection';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarousel from '@/components/carousel/MediaCarousel';
import CastCard from '@/components/CastCard';
import KeyCrew from '@/components/details/KeyCrew';
import Details from '@/components/details/Details';
import PosterCard from '@/components/PosterCard';
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
  const status = tvDetail.status;
  const networks = tvDetail.networks.map((network) => network.name);
  const productionCountries = tvDetail.production_countries.map(
    (country) => country.name
  );
  const productionCompanies = tvDetail.production_companies.map(
    (company) => company.name
  );

  const recommendedTV = filterWithImages(tvDetail.recommendations.results);
  const similarTV = filterWithImages(
    sortSimilarMedia(tvDetail.similar.results)
  );

  const sectionSpacing: SectionSpacing = 'content';

  return (
    <section className="flex flex-col items-center gap-10 lg:gap-12">
      <BackButton fallbackHref="/tv" />

      <DetailHeader
        mediaType="tv"
        id={tvDetail.id}
        imageBaseUrl={imageBaseUrl}
        posterPath={posterPath}
        backdropPath={backdropPath}
        title={tvDetail.name}
        creators={creators}
        releaseYear={releaseYear}
        seasonCount={tvDetail.number_of_seasons}
        episodeCount={tvDetail.number_of_episodes}
        voteAverage={tvDetail.vote_average}
        voteCount={tvDetail.vote_count}
        genres={tvDetail.genres}
      />

      <Overview overview={tvDetail.overview} />

      {trailers.length > 0 && (
        <Trailer key={selectedSeason} videos={trailers} />
      )}

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
        <SegmentRemount>
          <MediaCarousel>
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
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>

      {keyCrew.length > 0 && (
        <KeyCrew keyCrewEntries={keyCrew} creators={creators} />
      )}

      <Details
        releaseDate={formatDateLong(tvDetail.first_air_date)}
        status={status}
        networks={networks}
        originalLanguage={formatLanguage(tvDetail.original_language)}
        productionCountries={productionCountries}
        productionCompanies={productionCompanies}
      />

      {recommendedTV.length > 0 && (
        <CarouselSection title="Recommended TV Shows" spacing={sectionSpacing}>
          <SegmentRemount>
            <MediaCarousel>
              {recommendedTV.map((tv) => (
                <PosterCard
                  key={tv.id}
                  mediaType={tv.media_type}
                  id={tv.id}
                  title={tv.name}
                  releaseYear={formatReleaseYear(tv.first_air_date)}
                  voteAverage={tv.vote_average}
                  voteCount={tv.vote_count}
                  posterPath={tv.poster_path}
                  imageBaseUrl={imageBaseUrl}
                  inCarousel
                  carouselSpacing={sectionSpacing}
                  from={fromParam}
                />
              ))}
            </MediaCarousel>
          </SegmentRemount>
        </CarouselSection>
      )}

      {similarTV.length > 0 && (
        <CarouselSection title="Similar TV Shows" spacing={sectionSpacing}>
          <SegmentRemount>
            <MediaCarousel>
              {similarTV.map((tv) => (
                <PosterCard
                  key={tv.id}
                  mediaType="tv"
                  id={tv.id}
                  title={tv.name}
                  releaseYear={formatReleaseYear(tv.first_air_date)}
                  voteAverage={tv.vote_average}
                  voteCount={tv.vote_count}
                  posterPath={tv.poster_path}
                  imageBaseUrl={imageBaseUrl}
                  inCarousel
                  carouselSpacing={sectionSpacing}
                  from={fromParam}
                />
              ))}
            </MediaCarousel>
          </SegmentRemount>
        </CarouselSection>
      )}
    </section>
  );
}

export default function Page({ params, searchParams }: PageProps<'/tv/[id]'>) {
  return (
    <Suspense fallback={<ThreeDots className="min-h-nav-offset" />}>
      <TV params={params} searchParams={searchParams} />
    </Suspense>
  );
}
