import PosterCardSkeleton from './PosterCardSkeleton';

interface CarouselSectionSkeletonProps {
  title: string;
  className?: string;
}

const CarouselSectionSkeleton = ({
  title,
  className,
}: CarouselSectionSkeletonProps) => {
  return (
    <div
      className={`max-w-layout mx-auto flex w-full flex-col gap-6 overflow-hidden ${className ?? ''}`}
    >
      <h2 className="heading mx-layout py-px lg:py-0">{title}</h2>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 sm:gap-3 lg:gap-4 lg:overflow-hidden">
          {Array.from({ length: 8 }).map((_, idx) => (
            <PosterCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSectionSkeleton;
