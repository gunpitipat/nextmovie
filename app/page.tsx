import { getTMDBConfig, getTrendingMovies, getTrendingTV } from '@/lib/tmdb';
import { filterPosterSlides } from '@/lib/utils/filterPosterSlides';
import Hero from '@/components/home/Hero';
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

  const carouselMovies = filterPosterSlides(trendingMovies.results).filter(
    (movie) => movie.id !== heroMovie?.id
  );

  const carouselTV = filterPosterSlides(trendingTV.results).filter(
    (tv) => tv.id !== heroTV?.id
  );

  return (
    <section>
      {heroMovie && (
        <Hero media={heroMovie} imageBaseUrl={imageBaseUrl} preload />
      )}

      <div
        className={`${heroMovie ? 'mt-[70vh] lg:mt-[calc(75vh-56px+24px)]' : 'mt-4 lg:mt-6'} carousel-section mb-14 lg:mb-16`} // lg:mt-[hero - navbar + carousel section gap]
      >
        <h2 className="carousel-heading">Trending Movies</h2>
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
            />
          ))}
        </MediaCarouselWrapper>
      </div>

      {heroTV && <Hero media={heroTV} imageBaseUrl={imageBaseUrl} />}

      <div className="carousel-section mt-14 lg:mt-6">
        <h2 className="carousel-heading">Trending TV Series</h2>
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
            />
          ))}
        </MediaCarouselWrapper>
      </div>
    </section>
  );
}
