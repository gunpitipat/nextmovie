import { getTMDBConfig, getTrendingMovies, getTrendingTV } from '@/lib/tmdb';
import { filterWithImages, slugify, formatReleaseYear } from '@/lib/utils';
import Hero from '@/components/Hero';
import SegmentRemount from '@/components/SegmentRemount';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarousel from '@/components/carousel/MediaCarousel';
import PosterCard from '@/components/PosterCard';

export default async function Home() {
  const [config, trendingMovies, trendingTV] = await Promise.all([
    getTMDBConfig(),
    getTrendingMovies(),
    getTrendingTV(),
  ]);

  const imageBaseUrl = config.images.secure_base_url;

  const moviesWithImages = filterWithImages(trendingMovies.results);
  const tvWithImages = filterWithImages(trendingTV.results);

  const heroMovie = moviesWithImages[0];
  const heroTV = tvWithImages[0];

  if (!heroMovie && !heroTV) {
    throw new Error('No suitable trending media found for Hero sections.');
  }

  const carouselMovies = moviesWithImages.slice(1);
  const carouselTV = tvWithImages.slice(1);

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

      <CarouselSection
        title="Trending Movies"
        className={`${heroMovie ? 'mt-[70vh] lg:mt-[calc(75vh-56px+24px)]' : 'mt-4 lg:mt-6'} mb-14 lg:mb-16`} // lg:mt-[hero - navbar + carousel section gap]
      >
        <SegmentRemount>
          <MediaCarousel>
            {carouselMovies.map((movie) => (
              <PosterCard
                key={movie.id}
                mediaType={movie.media_type}
                id={movie.id}
                title={movie.title}
                releaseYear={formatReleaseYear(movie.release_date)}
                voteAverage={movie.vote_average}
                voteCount={movie.vote_count}
                posterPath={movie.poster_path}
                imageBaseUrl={imageBaseUrl}
                inCarousel
                from="/"
              />
            ))}
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>

      {heroTV && (
        <Hero
          media={heroTV}
          imageBaseUrl={imageBaseUrl}
          pathname={`/${heroTV.media_type}/${heroTV.id}-${slugify(heroTV.name)}`}
        />
      )}

      <CarouselSection title="Trending TV Shows" className="mt-14 lg:mt-6">
        <SegmentRemount>
          <MediaCarousel>
            {carouselTV.map((tv) => (
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
                from="/"
              />
            ))}
          </MediaCarousel>
        </SegmentRemount>
      </CarouselSection>
    </section>
  );
}
