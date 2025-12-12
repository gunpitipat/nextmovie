'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import SubnavCarousel from '../carousel/SubnavCarousel';
import DropdownMenu from './DropdownMenu';
import type { MenuItem, Genre } from '@/types';

interface SubnavProps {
  basePath: string;
  categories: MenuItem[];
  genres: Genre[];
}

const Subnav = ({ basePath, categories, genres }: SubnavProps) => {
  const [show, setShow] = useState(true);
  const [openGenres, setOpenGenres] = useState(false);

  const lastY = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();

  // Hide/show Subnav on scroll
  useEffect(() => {
    const THRESHOLD = 20; // Mobile rubber-band protection

    const handleScroll = () => {
      const y = window.scrollY;
      const maxY = document.body.scrollHeight - window.innerHeight;

      if (y <= THRESHOLD) {
        setShow(true);
      } else if (y > lastY.current || y >= maxY - THRESHOLD) {
        setOpenGenres(false);
        setShow(false);
      } else {
        setShow(true);
      }

      lastY.current = y;
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remove navbar bottom border on subnav presence
  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>('.navbar-solid');
    if (!navbar) return;

    navbar.style.borderBottomWidth = '0px';
    return () => {
      navbar.style.borderBottomWidth = '1px';
    };
  }, []);

  return (
    <div
      className={`${show ? 'pointer-events-auto translate-y-0' : 'pointer-events-none -translate-y-14'} border-surface-3 navbar-solid fixed z-40 w-full overflow-hidden border-b transition-transform duration-300 ease-in-out`}
    >
      <nav className="max-w-content mx-auto py-2.5">
        <SubnavCarousel>
          <div className="keen-slider__slide subnav-item">
            <Link
              href={basePath}
              className={`subnav-link ml-4 sm:ml-6 lg:ml-8 ${pathname === basePath ? 'subnav-link-active' : ''}`}
            >
              All
            </Link>
          </div>

          {categories.map((item) => (
            <div key={item.label} className="keen-slider__slide subnav-item">
              <Link
                href={item.href}
                className={`subnav-link ${pathname === item.href ? 'subnav-link-active' : ''}`}
              >
                {item.label}
              </Link>
            </div>
          ))}

          <div className="keen-slider__slide subnav-item">
            <button
              type="button"
              ref={buttonRef}
              onClick={() => setOpenGenres(!openGenres)}
              className="subnav-link mr-4 flex items-center gap-1 sm:mr-6 lg:mr-8"
            >
              <span>Genres</span>
              {openGenres ? (
                <FaAngleUp className="size-4" />
              ) : (
                <FaAngleDown className="size-4" />
              )}
            </button>

            <DropdownMenu
              basePath={basePath}
              genres={genres}
              open={openGenres}
              setOpen={setOpenGenres}
              anchorRef={buttonRef}
            />
          </div>
        </SubnavCarousel>
      </nav>
    </div>
  );
};

export default Subnav;
