'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const closeSidebar = () => {
    if (!open) return;
    setOpen(false);
  };

  // Hide overlay when switching back to desktop while sidebar is open
  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(min-width: 1024px)'); // Tailwind lg breakpoint
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches && open) setOpen(false);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [open]);

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

        {/* Desktop Menu */}
        <ul className="hidden items-center gap-6 lg:flex">
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

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="z-80 px-2 py-4 text-2xl lg:hidden">
          <FiMenu />
        </button>
      </nav>

      {/* Mobile Sidebar Menu */}
      <aside
        className={`border-border bg-background fixed top-0 right-0 z-70 h-dvh w-64 border-l transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}
      >
        <ul className="flex flex-col gap-2 px-6 py-12">
          <li>
            <Link
              href="/"
              onClick={closeSidebar}
              className={`nav-link ${pathname === '/' ? 'nav-link-active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link href="/" onClick={closeSidebar} className="nav-link">
              Movies
            </Link>
          </li>
          <li>
            <Link href="/" onClick={closeSidebar} className="nav-link">
              TV Shows
            </Link>
          </li>
          <li>
            <Link href="/" onClick={closeSidebar} className="nav-link">
              Favorites
            </Link>
          </li>
        </ul>
      </aside>
      <div
        onClick={closeSidebar}
        className={`fixed inset-0 z-60 h-dvh w-dvw bg-black/75 transition-opacity duration-300 ease-in-out ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      />
    </header>
  );
};

export default Navbar;
