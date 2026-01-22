import Skeleton from './Skeleton';

const PosterCardSkeleton = () => {
  return (
    <div className="bg-surface-2 shrink-0 overflow-hidden rounded-lg">
      <Skeleton className="aspect-2/3 w-40 lg:w-[175px]" />
      <div className="p-2">
        <Skeleton className="mt-1 h-3.5 w-full rounded-sm" />
        <Skeleton className="mt-2.5 mb-5.5 h-3.5 w-10 rounded-sm" />
      </div>
    </div>
  );
};

export default PosterCardSkeleton;
