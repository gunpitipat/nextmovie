'use client';

import { Ref, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { showToast } from '@/components/toast';
import type { Media, PaginatedResponse, APIError, APIResponse } from '@/types';

interface SearchBarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: Ref<HTMLInputElement>;
}

const SearchBar = ({ setOpen, ref }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Media[]>([]);

  const handleClearSearch = () => {
    setQuery('');
    if (window.innerWidth < 640) setOpen(false); // Tailwind sm breakpoint
  };

  // Fetch search results
  useEffect(() => {
    const q = query.trim();
    if (!q) return;

    const controller = new AbortController();

    const fetchResults = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          const err: APIError = await res.json();
          showToast(err.error);
          setResults([]);
          return;
        }

        const data: APIResponse<PaginatedResponse<Media>> = await res.json();
        setResults(data.data.results);
      } catch (err) {
        // Ignore abort error
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }

        showToast('Network error. Please try again.');
        setResults([]);
      }
    };

    const timeoutId = setTimeout(fetchResults, 400);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="relative w-75 sm:w-full sm:max-w-md">
      <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl">
        <IoSearch />
      </span>
      <input
        ref={ref}
        id="search-bar"
        type="text"
        autoComplete="off"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
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
    </div>
  );
};

export default SearchBar;
