import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface SeasonPaginationProps {
  currentSeason: number;
  totalSeasons: number;
  basePath: string;
  from: string;
}

const SeasonPagination = ({
  currentSeason,
  totalSeasons,
  basePath,
  from,
}: SeasonPaginationProps) => {
  const isFirst = currentSeason === 1;
  const isLast = currentSeason === totalSeasons;

  const previousPath = `${basePath}?season=${currentSeason - 1}&from=${encodeURIComponent(from)}`;
  const nextPath = `${basePath}?season=${currentSeason + 1}&from=${encodeURIComponent(from)}`;

  return (
    <div className="mt-6 flex items-center justify-center">
      <Link
        href={previousPath}
        className={`${isFirst ? 'hide' : 'show'} flex size-12 items-center justify-center lg:size-10`}
      >
        <div className="btn">
          <FaChevronLeft />
        </div>
      </Link>

      <span className="text-highlight mx-14 text-base font-semibold">
        {currentSeason}
      </span>

      <Link
        href={nextPath}
        className={`${isLast ? 'hide' : 'show'} flex size-12 items-center justify-center lg:size-10`}
      >
        <div className="btn">
          <FaChevronRight />
        </div>
      </Link>
    </div>
  );
};

export default SeasonPagination;
