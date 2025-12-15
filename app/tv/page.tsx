import Link from 'next/link';
import {
  getTMDBConfig,
  getPopularTV,
  getTopRatedTV,
  getOnTheAirTV,
} from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils/filterWithImages';
import { TV_CATEGORIES } from '@/lib/constants';
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
      <div className="carousel-section mt-8">
        <Link href={POPULAR.href} className="carousel-heading link-hover">
          {POPULAR.label} TV Shows
        </Link>
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
      </div>

      <div className="carousel-section">
        <Link href={TOP_RATED.href} className="carousel-heading link-hover">
          {TOP_RATED.label} TV Shows
        </Link>
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
      </div>

      <div className="carousel-section">
        <Link href={ON_THE_AIR.href} className="carousel-heading link-hover">
          {ON_THE_AIR.label} TV Shows
        </Link>
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
      </div>
    </section>
  );
}
