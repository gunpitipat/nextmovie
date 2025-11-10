'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import SearchBar from './SearchBar';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  const handleCloseSidebar = () => {
    if (!openMenu) return;
    setOpenMenu(false);
  };

  const handleOpenSearch = () => {
    setOpenSearch(true);
    if (window.innerWidth < 640 && inputRef.current) inputRef.current.focus();
  };

  // Hide overlay when switching back to desktop while sidebar is open
  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(min-width: 1024px)'); // Tailwind lg breakpoint
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches && openMenu) setOpenMenu(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [openMenu]);

  // Prevent search bar transitions when resizing across Tailwind sm breakpoint
  useEffect(() => {
    const el = searchRef.current;
    if (!el) return;

    const mediaQuery: MediaQueryList = window.matchMedia('(min-width: 640px)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) return;

      if (openSearch) setOpenSearch(false); // Hide overlay when crossing the breakpoint

      el.classList.remove('transition', 'duration-150');
      // NOTE: Keep 'transition duration-150' in JSX — React re-applies them on re-render (when openSearch changes),
      // ensuring mobile animations still work after this removal.
      // Adding them manually here won't persist as JSX className strings overwrite it.
    };

    // On mount
    if (mediaQuery.matches) el.classList.remove('transition', 'duration-150');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [openSearch]);

  return (
    <header className="border-border bg-background/50 fixed top-0 left-0 z-50 w-full border-b backdrop-blur-sm">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6">
        <Link href="/" className="flex items-end">
          <Image
            src="/images/logo.png"
            alt="nextmovie logo"
            width={24}
            height={24}
            className="block object-contain"
          />
          <p className="text-gradient text-2xl leading-none font-semibold">extmovie</p>
        </Link>

        <div
          ref={searchRef}
          className={`${
            openSearch
              ? 'pointer-events-auto translate-y-0 opacity-100'
              : 'pointer-events-none -translate-y-2 opacity-0'
          } fixed left-1/2 z-100 flex -translate-x-1/2 items-center justify-center transition duration-150 ease-out sm:pointer-events-auto sm:static sm:flex-1 sm:translate-0 sm:px-10 sm:opacity-100 sm:transition-none`}
        >
          <SearchBar ref={inputRef} setOpen={setOpenSearch} />
        </div>
        <div
          onClick={() => setOpenSearch(false)}
          className={`overlay z-90 ${openSearch ? 'show' : 'hide'}`}
        />

        {/* Desktop Menu */}
        <ul className="hidden items-center lg:flex">
          <li>
            <Link href="/" className="nav-link">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/" className="nav-link">
              TV Shows
            </Link>
          </li>
          <li>
            <Link href="/" className="nav-link">
              Favorites
            </Link>
          </li>
        </ul>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={handleOpenSearch} className="px-2 py-4 text-2xl sm:hidden">
            <IoSearch />
          </button>

          <button onClick={() => setOpenMenu(!openMenu)} className="z-80 px-2 py-4 text-2xl">
            {openMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`border-border bg-background fixed top-0 right-0 z-70 h-dvh w-64 border-l transition-transform duration-300 ease-in-out ${openMenu ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <ul className="flex flex-col gap-2 px-6 py-12">
          <li>
            <Link
              href="/"
              onClick={handleCloseSidebar}
              className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link href="/" onClick={handleCloseSidebar} className="nav-link">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/" onClick={handleCloseSidebar} className="nav-link">
              TV Shows
            </Link>
          </li>
          <li>
            <Link href="/" onClick={handleCloseSidebar} className="nav-link">
              Favorites
            </Link>
          </li>
        </ul>
      </aside>
      <div onClick={handleCloseSidebar} className={`overlay z-60 ${openMenu ? 'show' : 'hide'}`} />
    </header>
  );
};

export default Navbar;
