'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useNotFound } from '@/contexts/not-found-context';
import { getActiveNavState } from '@/lib/navigation';
import { NAV_ITEMS } from '@/lib/constants';

const DesktopMenu = () => {
  const [isHolding, setIsHolding] = useState(true);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { isNotFound } = useNotFound();

  const itemRefs = useRef<HTMLLIElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number>(-1); // Track previous active index to determine whether indicator should fade in or slide

  const pathname = usePathname();
  const { index, basePath } = getActiveNavState(pathname, isNotFound);

  const HOLD_INDICATOR_MS = 100;

  // Hold indicator briefly on route change to prevent flicker while the page validates and may trigger notFound()
  useEffect(() => {
    const startHold = setTimeout(() => {
      setIsHolding(true);
    }, 0);

    const releaseHold = setTimeout(() => {
      setIsHolding(false);
    }, HOLD_INDICATOR_MS);

    return () => {
      clearTimeout(startHold);
      clearTimeout(releaseHold);
    };
  }, [pathname]);

  // Animate indicator
  useEffect(() => {
    if (!isDesktop || isHolding) return;

    const indicator = indicatorRef.current;
    if (!indicator) return;

    if (index === -1) {
      indicator.style.opacity = '0';
      prevIndexRef.current = index;
      return;
    }

    const menuItem = itemRefs.current[index];
    const parent = menuItem?.parentElement;
    if (!menuItem || !parent) return;

    const rect = menuItem.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    const transition =
      prevIndexRef.current === -1
        ? 'opacity 200ms ease-in-out'
        : 'transform 200ms ease-in-out, opacity 200ms ease-in-out';

    indicator.style.transition = transition;
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    indicator.style.opacity = '1';

    prevIndexRef.current = index;
  }, [isHolding, isDesktop, index]);

  return (
    <ul className="relative hidden items-center gap-8 lg:flex">
      {NAV_ITEMS.map((item, i) => (
        <li
          key={item.label}
          ref={(el) => {
            if (el) itemRefs.current[i] = el;
          }}
        >
          <Link
            href={item.href}
            className={`nav-link px-1 ${basePath === item.href ? 'text-highlight' : ''}`}
          >
            {item.label}
          </Link>
        </li>
      ))}

      <div
        ref={indicatorRef}
        className="bg-primary absolute bottom-0 h-0.5 will-change-[opacity,transform]"
      />
    </ul>
  );
};

export default DesktopMenu;
