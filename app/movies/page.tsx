import {
  getTMDBConfig,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils';
import { MOVIE_CATEGORIES } from '@/lib/constants';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarouselWrapper from '@/components/carousel/MediaCarouselWrapper';
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
        <MediaCarouselWrapper>
          {popularSlides.map((movie) => (
            <PosterCard
              key={movie.id}
              mediaType="movie"
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      <CarouselSection
        title={`${TOP_RATED.label} Movies`}
        href={TOP_RATED.href}
      >
        <MediaCarouselWrapper>
          {topRatedSlides.map((movie) => (
            <PosterCard
              key={movie.id}
              mediaType="movie"
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      <CarouselSection
        title={`${NOW_PLAYING.label} Movies`}
        href={NOW_PLAYING.href}
      >
        <MediaCarouselWrapper>
          {nowPlayingSlides.map((movie) => (
            <PosterCard
              key={movie.id}
              mediaType="movie"
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>
    </section>
  );
}
