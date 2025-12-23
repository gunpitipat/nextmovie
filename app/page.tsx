import { getTMDBConfig, getTrendingMovies, getTrendingTV } from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils/filterWithImages';
import { slugify } from '@/lib/utils/slug';
import Hero from '@/components/home/Hero';
import CarouselHeader from '@/components/carousel/CarouselHeader';
import MediaCarouselWrapper from '@/components/carousel/MediaCarouselWrapper';
import PosterCard from '@/components/PosterCard';

export default async function Home() {
  const [config, trendingMovies, trendingTV] = await Promise.all([
    getTMDBConfig(),
    getTrendingMovies(),
    getTrendingTV(),
  ]);

  const imageBaseUrl = config.images.secure_base_url;

  const heroMovie = trendingMovies.results.find(
    (movie) => movie.poster_path && movie.backdrop_path
  );

  const heroTV = trendingTV.results.find(
    (tv) => tv.poster_path && tv.backdrop_path
  );

  if (!heroMovie && !heroTV) {
    throw new Error('No suitable trending media found for Hero sections.');
  }

  const carouselMovies = filterWithImages(trendingMovies.results).filter(
    (movie) => movie.id !== heroMovie?.id
  );

  const carouselTV = filterWithImages(trendingTV.results).filter(
    (tv) => tv.id !== heroTV?.id
  );

  return (
    <section>
      {heroMovie && (
        <Hero
          media={heroMovie}
          imageBaseUrl={imageBaseUrl}
          pathname={`/${heroMovie.media_type}/${heroMovie.id}-${slugify(heroMovie.title)}`}
          preload
        />
      )}

      <div
        className={`${heroMovie ? 'mt-[70vh] lg:mt-[calc(75vh-56px+24px)]' : 'mt-4 lg:mt-6'} carousel-section mb-14 lg:mb-16`} // lg:mt-[hero - navbar + carousel section gap]
      >
        <CarouselHeader title="Trending Movies" />
        <MediaCarouselWrapper>
          {carouselMovies.map((movie) => (
            <PosterCard
              key={movie.id}
              mediaType={movie.media_type}
              id={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
              from="/"
            />
          ))}
        </MediaCarouselWrapper>
      </div>

      {heroTV && (
        <Hero
          media={heroTV}
          imageBaseUrl={imageBaseUrl}
          pathname={`/${heroTV.media_type}/${heroTV.id}-${slugify(heroTV.name)}`}
        />
      )}

      <div className="carousel-section mt-14 lg:mt-6">
        <CarouselHeader title="Trending TV Shows" />
        <MediaCarouselWrapper>
          {carouselTV.map((tv) => (
            <PosterCard
              key={tv.id}
              mediaType={tv.media_type}
              id={tv.id}
              title={tv.name}
              rating={tv.vote_average}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
              from="/"
            />
          ))}
        </MediaCarouselWrapper>
      </div>
    </section>
  );
}
