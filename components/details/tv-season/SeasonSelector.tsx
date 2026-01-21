'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

interface SeasonSelectorProps {
  selectedSeason: number;
  seasonNumbers: number[];
  basePath: string;
  from: string;
}

const SeasonSelector = ({
  selectedSeason,
  seasonNumbers,
  basePath,
  from,
}: SeasonSelectorProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const targetHref = (seasonNumber: number) =>
    `${basePath}?season=${seasonNumber}&from=${encodeURIComponent(from)}`;

  // Initialize OverlayScrollbars
  useEffect(() => {
    if (!openDropdown || !listRef.current) return;

    const osInstance = OverlayScrollbars(listRef.current, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'leave',
        autoHideDelay: 800,
        autoHideSuspend: true,
      },
    });

    return () => osInstance.destroy();
  }, [openDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const button = buttonRef.current;
      const menu = listRef.current;

      if (!button || !menu || !(event.target instanceof Node)) return;

      if (!button.contains(event.target) && !menu.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [openDropdown]);

  return (
    <div className="relative h-12 lg:h-10">
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setOpenDropdown(!openDropdown)}
        className="hover:text-highlight z-20 h-full transition-colors duration-200 ease-in-out outline-none"
      >
        <div className="bg-surface-2 flex items-center justify-center gap-1 rounded-lg px-3 py-2">
          <h2 className="heading">{selectedSeason}</h2>
          {openDropdown ? (
            <FaAngleUp className="size-4" />
          ) : (
            <FaAngleDown className="size-4" />
          )}
        </div>
      </button>

      <ul
        ref={listRef}
        className={`${openDropdown ? 'show translate-y-0' : 'hide -translate-y-2'} season-dropdown border-surface-3 surface-solid absolute z-10 max-h-[250px] w-full overflow-y-auto overscroll-contain rounded-lg border py-1 transition duration-150 ease-out`}
        data-overlayscrollbars-initialize
      >
        {seasonNumbers.map((season) => (
          <li key={season}>
            <Link
              href={targetHref(season)}
              className={`${selectedSeason === season ? 'bg-primary text-background' : 'hover:text-highlight hover:bg-surface-2'} w-full py-3 pr-6 pl-4 text-center font-medium`}
            >
              {season}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonSelector;
