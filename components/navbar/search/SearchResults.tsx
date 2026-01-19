import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useTMDBConfig } from '@/contexts/tmdb-config-context';
import { buildFromStack, formatReleaseYear } from '@/lib/utils';
import Skeleton from '@/components/Skeleton';
import SearchItem from './SearchItem';
import type { Media } from '@/types';

interface SearchResultsProps {
  isActive: boolean;
  isTyping: boolean;
  loading: boolean;
  results: (Media & { poster_path: string; backdrop_path: string })[];
  query: string;
  onClosePanel: () => void;
}

const SearchResults = ({
  isActive,
  isTyping,
  loading,
  results,
  query,
  onClosePanel,
}: SearchResultsProps) => {
  const config = useTMDBConfig();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const params = new URLSearchParams(searchParams);
  params.delete('from');

  const base = params.size > 0 ? `${pathname}?${params.toString()}` : pathname;
  const fromParam = buildFromStack(base, from);

  const imageBaseUrl = config.images.secure_base_url;

  const MAX_SEARCH_RESULTS = 5;

  const showSkeletons = isTyping || loading;
  const showNotFound = !showSkeletons && results.length === 0;
  const showResults = !showSkeletons && results.length > 0;
  const showViewAll = !showSkeletons && results.length > MAX_SEARCH_RESULTS;

  return (
    <div
      className={`${isActive ? 'show' : 'hide'} bg-surface-1 border-surface-3 absolute z-100 mt-1 flex w-full flex-col rounded-lg border p-2 transition-opacity duration-150 ease-out`}
    >
      {showSkeletons &&
        Array.from({ length: MAX_SEARCH_RESULTS }).map((_, idx) => (
          <div
            key={idx}
            className="border-surface-3 flex gap-3 border-b p-2 last:border-b-0"
          >
            <Skeleton className="aspect-2/3 w-12 rounded-sm" />
            <div>
              <Skeleton className="mt-1 h-4 w-40 rounded-sm" />
              <Skeleton className="mt-2 h-3.5 w-28 rounded-sm" />
            </div>
          </div>
        ))}

      {showNotFound && (
        <p className="p-2 text-center text-sm">No results found</p>
      )}

      {showResults &&
        results
          .slice(0, MAX_SEARCH_RESULTS)
          .map((item) => (
            <SearchItem
              key={item.id}
              mediaType={item.media_type}
              id={item.id}
              title={item.media_type === 'movie' ? item.title : item.name}
              releaseYear={formatReleaseYear(
                item.media_type === 'movie'
                  ? item.release_date
                  : item.first_air_date
              )}
              posterPath={item.poster_path}
              imageBaseUrl={imageBaseUrl}
              from={fromParam}
              onClosePanel={onClosePanel}
            />
          ))}

      {showViewAll && (
        <Link
          href={`/search?q=${encodeURIComponent(query)}`}
          className="hover:bg-surface-2 flex items-center gap-1 rounded-b-lg p-2 text-sm"
          onClick={onClosePanel}
        >
          View all results
          <FaArrowRight className="size-3" />
        </Link>
      )}
    </div>
  );
};

export default SearchResults;
