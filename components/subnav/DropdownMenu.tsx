'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import { slugify } from '@/lib/slug';
import type { Genre } from '@/types';

interface DropdownMenuProps {
  basePath: string;
  genres: Genre[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownMenu = ({
  basePath,
  genres,
  open,
  setOpen,
  anchorRef,
}: DropdownMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const THRESHOLD = 8; // Spacing for dropdown positioning in px

  // Enable client-only DOM usage; prevent SSR mismatches
  useEffect(() => {
    Promise.resolve().then(() => setMounted(true));
  }, []);

  // Initialize OverlayScrollbars
  useEffect(() => {
    if (!mounted || !listRef.current) return;

    const osInstance = OverlayScrollbars(listRef.current, {
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'leave',
        autoHideDelay: 800,
        autoHideSuspend: true,
      },
    });

    return () => osInstance.destroy();
  }, [mounted]);

  // Position dropdown relative to anchor; update on resize
  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      if (!anchorRef.current || !listRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const anchor = anchorRef.current.getBoundingClientRect();

      // Percentage of anchor visible in viewport
      const visibleAnchorPortion =
        ((Math.min(anchor.right, vw) - Math.max(anchor.left, 0)) /
          anchor.width) *
        100;

      if (visibleAnchorPortion < 50) {
        setOpen(false);
        return;
      }

      const menu = listRef.current;
      const { width, height } = menu.getBoundingClientRect();

      const top = anchor.bottom + THRESHOLD;
      let left = anchor.left;

      if (left + width > vw - THRESHOLD) {
        left = vw - THRESHOLD - width;
      }
      if (top + height > vh - THRESHOLD) {
        menu.style.maxHeight = `${vh - 2 * THRESHOLD - top}px`;
      }

      menu.style.top = `${top}px`;
      menu.style.left = `${left}px`;
    };

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updatePosition();
      }, 120);
    };

    updatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [open, setOpen, anchorRef]);

  // Lock page scrolling when dropdown is open
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
  }, [open]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const anchor = anchorRef.current;
      const menu = listRef.current;

      if (!anchor || !menu || !(event.target instanceof Node)) return;

      if (!anchor.contains(event.target) && !menu.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open, setOpen, anchorRef]);

  if (!mounted || !pathname.startsWith(basePath)) return null;

  const dropdownRoot = document.getElementById('dropdown-root');
  if (!dropdownRoot) return null;

  return createPortal(
    <ul
      ref={listRef}
      className={`${open ? 'show translate-y-0' : 'hide -translate-y-2'} bg-surface-2 absolute max-h-90 w-fit overflow-y-auto overscroll-contain rounded-lg py-1 transition duration-150 ease-out`}
      data-overlayscrollbars-initialize
    >
      {genres.map((genre) => {
        const slug = `${basePath}/genres/${slugify(genre.name)}`;
        return (
          <li key={genre.id}>
            <Link
              href={slug}
              className={`${pathname === slug ? 'subnav-link-active' : ''} hover:text-highlight hover:bg-surface-3 size-full py-3 pr-6 pl-4 text-sm`}
            >
              {genre.name}
            </Link>
          </li>
        );
      })}
    </ul>,
    dropdownRoot
  );
};

export default DropdownMenu;
