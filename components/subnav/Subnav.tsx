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
    const handleScroll = () => {
      const y = window.scrollY;

      if (y > lastY.current) {
        setOpenGenres(false);
        setShow(false);
      } else {
        setShow(true);
      }

      lastY.current = y;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      setShow(true); // Reset to default to avoid stale state on remount
    };
  }, []);

  return (
    <div
      className={`${show ? 'show h-14' : 'hide h-7'} nav-bg fixed w-full overflow-hidden transition-[height,opacity] duration-300 ease-in-out`}
    >
      <nav className="max-w-content mx-auto pt-2 pb-3">
        <SubnavCarousel>
          <div className="keen-slider__slide subnav-item">
            <Link
              href={basePath}
              className={`subnav-link ml-8 ${pathname === basePath ? 'subnav-link-active' : ''}`}
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
              className="subnav-link mr-8 flex items-center gap-1"
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
