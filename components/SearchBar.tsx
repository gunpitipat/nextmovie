'use client';

import { Ref, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';

interface SearchBarProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref?: Ref<HTMLInputElement>;
}

const SearchBar = ({ setOpen, ref }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleClearSearch = () => {
    setQuery('');
    if (window.innerWidth < 640) setOpen(false); // Tailwind sm breakpoint
  };

  return (
    <div className="relative w-75 sm:w-full sm:max-w-md">
      <span className="absolute top-1/2 left-4 -translate-y-1/2 text-xl">
        <IoSearch />
      </span>
      <input
        ref={ref}
        id="search-bar"
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Find your next movie"
        className="from-surface-3 to-surface-2 placeholder:text-muted focus:border-muted w-full rounded-full border border-transparent bg-linear-to-b px-12 py-1.5 text-base transition-colors duration-150 ease-out placeholder:font-light focus:outline-none"
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
