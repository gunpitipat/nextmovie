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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Find your next movie"
        className="bg-surface placeholder:text-foreground/50 focus:ring-foreground/50 w-full rounded-full px-12 py-1.5 text-base placeholder:font-light focus:ring-1 focus:outline-none"
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
