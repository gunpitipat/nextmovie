'use client';

import { Ref, useEffect, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { filterWithImages } from '@/lib/utils';
import { showToast } from '@/components/toast';
import SearchResults from './SearchResults';
import type { Media, PaginatedResponse, APIError, APIResponse } from '@/types';

interface SearchBarProps {
  ref: Ref<HTMLInputElement>;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseSearch: () => void;
}

const SearchBar = ({
  ref,
  isActive,
  setIsActive,
  onCloseSearch,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Media[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const isMobile = useMediaQuery('(max-width: 639px)'); // Tailwind sm breakpoint

  const containerRef = useRef<HTMLDivElement>(null);

  const handleClearSearch = () => {
    setQuery('');
    onCloseSearch();
  };

  // Close result panel on desktop when clicking outside
  useEffect(() => {
    if (isMobile) return;
    // Skip on mobile: search button is outside the container,
    // this logic would close the result panel immediately on open.

    const handleClickOutside = (event: MouseEvent) => {
      const container = containerRef.current;

      if (!container || !(event.target instanceof Node)) return;

      if (!container.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, setIsActive]);

  // Fetch search results
  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const err: APIError = await res.json();
          showToast(err.error);
          setResults([]);
          setTotalResults(0);
          return;
        }

        const data: APIResponse<PaginatedResponse<Media>> = await res.json();
        setResults(data.data.results);
        setTotalResults(data.data.total_results);
      } catch (err) {
        // Ignore abort error
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        showToast('Network error. Please try again.');
        setResults([]);
        setTotalResults(0);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      fetchResults();
      setIsTyping(false);
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-75 sm:w-full sm:max-w-md">
      <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl">
        <IoSearch />
      </span>
      <input
        ref={ref}
        id="search-bar"
        type="text"
        autoComplete="off"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsTyping(true);
          setQuery(e.target.value);
        }}
        onFocus={() => setIsActive(true)}
        placeholder="Find your next movie"
        className="placeholder:text-muted focus:border-muted border-surface-1 bg-surface-2 w-full rounded-full border px-12 py-1.5 text-base transition-colors duration-150 ease-out focus:outline-none"
      />
      <button
        type="button"
        onClick={handleClearSearch}
        className={`${query.length === 0 ? 'sm:hidden' : ''} hover:bg-background absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1.5 text-xl`}
      >
        <FiX />
      </button>

      <SearchResults
        isActive={isActive && query.trim() !== ''}
        isTyping={isTyping}
        loading={loading}
        results={filterWithImages(results)}
        totalResults={totalResults}
        query={query.trim()}
        onClosePanel={onCloseSearch}
      />
    </div>
  );
};

export default SearchBar;
