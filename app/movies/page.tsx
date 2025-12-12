import Link from 'next/link';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTMDBConfig,
  getTopRatedMovies,
} from '@/lib/tmdb';
import { filterPosterSlides } from '@/lib/utils/filterPosterSlides';
import { MOVIE_CATEGORIES } from '@/lib/constants';
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

  const popularSlides = filterPosterSlides(popular.results);
  const topRatedSlides = filterPosterSlides(topRated.results);
  const nowPlayingSlides = filterPosterSlides(nowPlaying.results);

  const [POPULAR, TOP_RATED, NOW_PLAYING] = MOVIE_CATEGORIES;

  return (
    <section className="flex flex-col gap-10 lg:gap-12">
      <div className="carousel-section mt-6 lg:mt-8">
        <Link href={POPULAR.href} className="carousel-heading link-hover">
          {POPULAR.label} Movies
        </Link>
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
      </div>

      <div className="carousel-section">
        <Link href={TOP_RATED.href} className="carousel-heading link-hover">
          {TOP_RATED.label} Movies
        </Link>
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
      </div>

      <div className="carousel-section">
        <Link href={NOW_PLAYING.href} className="carousel-heading link-hover">
          {NOW_PLAYING.label} Movies
        </Link>
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
      </div>
    </section>
  );
}
