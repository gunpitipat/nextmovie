import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getMovieDetail, getCollection } from '@/lib/tmdb';
import {
  buildFromStack,
  formatReleaseYear,
  formatRuntime,
  formatVoteCount,
  getTrailers,
  getTopCast,
  getKeyCrewEntries,
  formatDate,
  formatLanguage,
  filterRelatedMovies,
  filterWithImages,
  sortSimilarMovies,
} from '@/lib/utils';
import BackButton from '@/components/BackButton';
import DetailHeader from '@/components/details/DetailHeader';
import Trailer from '@/components/details/Trailer';
import Overview from '@/components/details/Overview';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarouselWrapper from '@/components/carousel/MediaCarouselWrapper';
import CastCard from '@/components/CastCard';
import KeyCrew from '@/components/details/KeyCrew';
import Details from '@/components/details/Details';
import PosterCard from '@/components/PosterCard';
import type {
  TMDBConfig,
  MovieDetail,
  SectionSpacing,
  MediaMovie,
} from '@/types';

async function Movie({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const movieId = id.split('-')[0];

  let config: TMDBConfig;
  let movie: MovieDetail;

  try {
    [config, movie] = await Promise.all([
      getTMDBConfig(),
      getMovieDetail(movieId),
    ]);
  } catch (err) {
    if (err instanceof Error && err.message.includes('TMDB error 404')) {
      notFound();
    }
    throw err;
  }

  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path;

  if (!posterPath || !backdropPath) notFound();

  const { from } = await searchParams;
  const fromParam = buildFromStack(`/movie/${id}`, from);

  const collectionId = movie.belongs_to_collection?.id;
  let relatedMovies: (MediaMovie & {
    poster_path: string;
    backdrop_path: string;
  })[] = [];

  if (collectionId) {
    try {
      const collection = await getCollection(collectionId);
      relatedMovies = filterWithImages(
        filterRelatedMovies(collection.parts, movie.id)
      );
    } catch {
      relatedMovies = [];
    }
  }

  const imageBaseUrl = config.images.secure_base_url;
  const status = movie.status !== 'Released' ? movie.status : undefined;
  const directors = movie.credits.crew
    .filter((crew) => crew.job === 'Director')
    .map((director) => director.name);

  const trailers = getTrailers(movie.videos.results);
  const topCast = getTopCast(movie.credits.cast);
  const keyCrew = getKeyCrewEntries(movie.credits.crew);
  const productionCountries = movie.production_countries.map(
    (country) => country.name
  );
  const productionCompanies = movie.production_companies.map(
    (company) => company.name
  );

  const uniqueRecommended = movie.recommendations.results.filter(
    (recommended) =>
      !relatedMovies.some((related) => related.id === recommended.id)
  );
  const recommendedMovies = filterWithImages(uniqueRecommended);
  const similarMovies = filterWithImages(
    sortSimilarMovies(movie.similar.results)
  );

  const shouldShowSimilar =
    similarMovies.length !== 0 &&
    (relatedMovies.length === 0 || recommendedMovies.length === 0);

  const sectionSpacing: SectionSpacing = 'content';

  return (
    <section className="flex flex-col items-center gap-10 lg:gap-12">
      <BackButton fallbackHref="/movies" />

      <DetailHeader
        imageBaseUrl={imageBaseUrl}
        posterPath={posterPath}
        backdropPath={backdropPath}
        title={movie.title}
        directors={directors}
        releaseYear={formatReleaseYear(movie.release_date)}
        status={status}
        runtime={formatRuntime(movie.runtime)}
        voteAverage={movie.vote_average.toFixed(1)}
        voteCount={formatVoteCount(movie.vote_count)}
        genres={movie.genres}
      />

      <Overview overview={movie.overview} />

      {trailers.length > 0 && <Trailer videos={trailers} />}

      <CarouselSection title="Top Cast" spacing={sectionSpacing}>
        <MediaCarouselWrapper>
          {topCast.map((cast) => (
            <CastCard
              key={cast.id}
              name={cast.name}
              character={cast.character}
              profilePath={cast.profile_path}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      {keyCrew.length > 0 && <KeyCrew keyCrewEntries={keyCrew} />}

      <Details
        releaseDate={formatDate(movie.release_date)}
        originalLanguage={formatLanguage(movie.original_language)}
        productionCountries={productionCountries}
        productionCompanies={productionCompanies}
      />

      {relatedMovies.length > 0 && (
        <CarouselSection title="Related Movies" spacing={sectionSpacing}>
          <MediaCarouselWrapper>
            {relatedMovies.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType={movie.media_type}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
                carouselSpacing={sectionSpacing}
                from={fromParam}
              />
            ))}
          </MediaCarouselWrapper>
        </CarouselSection>
      )}

      {recommendedMovies.length > 0 && (
        <CarouselSection title="Recommended Movies" spacing={sectionSpacing}>
          <MediaCarouselWrapper>
            {recommendedMovies.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType={movie.media_type}
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
                carouselSpacing={sectionSpacing}
                from={fromParam}
              />
            ))}
          </MediaCarouselWrapper>
        </CarouselSection>
      )}

      {shouldShowSimilar && (
        <CarouselSection title="Similar Movies" spacing={sectionSpacing}>
          <MediaCarouselWrapper>
            {similarMovies.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType="movie"
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
                carouselSpacing={sectionSpacing}
                from={fromParam}
              />
            ))}
          </MediaCarouselWrapper>
        </CarouselSection>
      )}
    </section>
  );
}

export default function Page({
  params,
  searchParams,
}: PageProps<'/movie/[id]'>) {
  return (
    <Suspense>
      <Movie params={params} searchParams={searchParams} />
    </Suspense>
  );
}
