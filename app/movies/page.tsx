import {
  getTMDBConfig,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '@/lib/tmdb';
import { filterWithImages, formatReleaseYear } from '@/lib/utils';
import { MOVIE_CATEGORIES } from '@/lib/constants';
import SegmentRemount from '@/components/SegmentRemount';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarousel from '@/components/carousel/MediaCarousel';
import PosterCard from '@/components/PosterCard';

export default async function Movies() {
  const [config, popular, topRated, nowPlaying] = await Promise.all([
    getTMDBConfig(),
    getPopularMovies(),
    getTopRatedMovies(),
    getNowPlayingMovies(),
  ]);

  const imageBaseUrl = config.images.secure_base_url;

  const popularSlides = filterWithImages(popular.results);
  const topRatedSlides = filterWithImages(topRated.results);
  const nowPlayingSlides = filterWithImages(nowPlaying.results);

  const [POPULAR, TOP_RATED, NOW_PLAYING] = MOVIE_CATEGORIES;

  return (
    <section className="flex flex-col gap-10 lg:gap-12">
      <CarouselSection
        title={`${POPULAR.label} Movies`}
        href={POPULAR.href}
        className="mt-8"
      >
        <SegmentRemount>
          <MediaCarousel>
            {popularSlides.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType="movie"
                id={movie.id}
                title={movie.title}
                releaseYear={formatReleaseYear(movie.release_date)}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
              />
            ))}
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>

      <CarouselSection
        title={`${TOP_RATED.label} Movies`}
        href={TOP_RATED.href}
      >
        <SegmentRemount>
          <MediaCarousel>
            {topRatedSlides.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType="movie"
                id={movie.id}
                title={movie.title}
                releaseYear={formatReleaseYear(movie.release_date)}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
              />
            ))}
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>

      <CarouselSection
        title={`${NOW_PLAYING.label} Movies`}
        href={NOW_PLAYING.href}
      >
        <SegmentRemount>
          <MediaCarousel>
            {nowPlayingSlides.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType="movie"
                id={movie.id}
                title={movie.title}
                releaseYear={formatReleaseYear(movie.release_date)}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
              />
            ))}
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>
    </section>
  );
}
