import { MOVIE_CATEGORIES } from '@/lib/constants';
import CarouselSectionSkeleton from '@/components/loading/CarouselSectionSkeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-10 lg:gap-12">
      {MOVIE_CATEGORIES.map((cat, idx) => (
        <CarouselSectionSkeleton
          key={cat.label}
          title={`${cat.label} Movies`}
          className={idx === 0 ? 'mt-8' : ''}
        />
      ))}
    </div>
  );
}
