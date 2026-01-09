import {
  getTMDBConfig,
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
} from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils';
import { TV_CATEGORIES } from '@/lib/constants';
import CarouselSection from '@/components/carousel/CarouselSection';
import MediaCarouselWrapper from '@/components/carousel/MediaCarouselWrapper';
import PosterCard from '@/components/PosterCard';

export default async function TV() {
  const [config, popular, topRated, onTheAir] = await Promise.all([
    getTMDBConfig(),
    getPopularTV(),
    getTopRatedTV(),
    getOnTheAirTV(),
  ]);

  const imageBaseUrl = config.images.secure_base_url;

  const popularSlides = filterWithImages(popular.results);
  const topRatedSlides = filterWithImages(topRated.results);
  const onTheAirSlides = filterWithImages(onTheAir.results);

  const [POPULAR, TOP_RATED, ON_THE_AIR] = TV_CATEGORIES;

  return (
    <section className="flex flex-col gap-10 lg:gap-12">
      <CarouselSection
        title={`${POPULAR.label} TV Shows`}
        href={POPULAR.href}
        className="mt-8"
      >
        <MediaCarouselWrapper>
          {popularSlides.map((tv) => (
            <PosterCard
              key={tv.id}
              mediaType="tv"
              id={tv.id}
              title={tv.name}
              rating={tv.vote_average}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      <CarouselSection
        title={`${TOP_RATED.label} TV Shows`}
        href={TOP_RATED.href}
      >
        <MediaCarouselWrapper>
          {topRatedSlides.map((tv) => (
            <PosterCard
              key={tv.id}
              mediaType="tv"
              id={tv.id}
              title={tv.name}
              rating={tv.vote_average}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>

      <CarouselSection
        title={`${ON_THE_AIR.label} TV Shows`}
        href={ON_THE_AIR.href}
      >
        <MediaCarouselWrapper>
          {onTheAirSlides.map((tv) => (
            <PosterCard
              key={tv.id}
              mediaType="tv"
              id={tv.id}
              title={tv.name}
              rating={tv.vote_average}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
              inCarousel
            />
          ))}
        </MediaCarouselWrapper>
      </CarouselSection>
    </section>
  );
}
