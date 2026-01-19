'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { useNotFound } from '@/contexts/not-found-context';
import { getActiveNavState } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import SearchBar from './search/SearchBar';
import DesktopMenu from './DesktopMenu';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const { isNotFound } = useNotFound();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const { basePath } = getActiveNavState(pathname, isNotFound);

  const handleOpenSearch = () => {
    setOpenSearch(true);
    setSearchActive(true);
    inputRef.current?.focus();
  };

  const handleCloseSearch = () => {
    setSearchActive(false);
    setOpenSearch(false);
  };

  // Lock page scrolling when mobile sidebar or search is open
  useEffect(() => {
    if (openMenu || openSearch) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [openMenu, openSearch]);

  // Hide overlay when switching back to desktop while sidebar is open
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)'); // Tailwind lg breakpoint
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches && openMenu) setOpenMenu(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [openMenu]);

  // Handle search bar behavior when crossing sm breakpoint
  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(min-width: 640px)');
    const handleChange = (event: MediaQueryListEvent) => {
      if (!event.matches) {
        // Keep search open on mobile when search is active on desktop
        if (searchActive) {
          setOpenSearch(true);
        }
        return;
      }

      // Hide overlay on desktop when search is open on mobile
      if (openSearch) {
        setOpenSearch(false);
      }

      // Prevent search bar transitions on resize across breakpoint
      el.classList.remove('transition', 'duration-150');
      // NOTE: Keep 'transition duration-150' in JSX — React re-applies them on re-render (when openSearch changes),
      // ensuring mobile animations still work after this removal.
      // Adding them manually here won't persist as JSX className strings overwrite it.
    };

    // On mount
    if (mediaQuery.matches) el.classList.remove('transition', 'duration-150');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [openSearch, searchActive]);

  return (
    <header
      className={`${pathname === '/' ? 'navbar-glass' : 'navbar-solid'} fixed top-0 left-0 z-50 w-full`}
    >
      <nav className="max-w-layout px-layout mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-end">
          <Image
            src="/images/nextmovie-logo.png"
            alt="Nextmovie logo"
            width={24}
            height={24}
            draggable={false}
            className="block object-contain"
          />
          <p className="text-gradient text-2xl leading-none font-semibold select-none">
            extmovie
          </p>
        </Link>

        <div
          ref={searchRef}
          className={`${
            openSearch
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          } fixed left-1/2 z-100 flex -translate-x-1/2 items-center justify-center transition duration-150 ease-out sm:pointer-events-auto sm:static sm:z-50 sm:flex-1 sm:translate-0 sm:px-10 sm:opacity-100 sm:transition-none`}
        >
          <SearchBar
            ref={inputRef}
            isActive={searchActive}
            setIsActive={setSearchActive}
            onCloseSearch={handleCloseSearch}
          />
        </div>
        <div
          onClick={handleCloseSearch}
          className={`overlay z-90 ${openSearch ? 'show' : 'hide'}`}
        />

        <DesktopMenu />

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={handleOpenSearch}
            className="px-2 py-4 text-2xl sm:hidden"
          >
            <IoSearch />
          </button>

          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="z-80 px-2 py-4 text-2xl"
          >
            {openMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`bg-background fixed top-0 right-0 z-70 h-dvh w-60 transition-transform duration-300 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <ul className="flex flex-col gap-2 px-6 py-15">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setOpenMenu(false)}
                className={`nav-link relative px-5 ${basePath === item.href ? 'text-highlight bg-surface-1 after:bg-secondary rounded-r-lg after:absolute after:inset-0 after:w-[3px]' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div
        onClick={() => setOpenMenu(false)}
        className={`overlay z-60 ${openMenu ? 'show' : 'hide'}`}
      />
    </header>
  );
};

export default Navbar;
