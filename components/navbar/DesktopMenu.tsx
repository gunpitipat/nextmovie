'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { NAV_ITEMS } from '@/lib/constants';

const DesktopMenu = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const itemRefs = useRef<HTMLLIElement[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  // Animate indicator
  useEffect(() => {
    if (!isDesktop) return;

    const indicator = indicatorRef.current;
    if (!indicator) return;

    const index = NAV_ITEMS.findIndex((item) => pathname.startsWith(item.href));
    if (index === -1) {
      indicator.style.opacity = '0';
      return;
    }

    const menuItem = itemRefs.current[index];
    const parent = menuItem?.parentElement;
    if (!menuItem || !parent) return;

    const rect = menuItem.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    indicator.style.opacity = '1';
  }, [pathname, isDesktop]);

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
            className={`nav-link px-1 ${pathname.startsWith(item.href) ? 'text-highlight' : ''}`}
          >
            {item.label}
          </Link>
        </li>
      ))}

      <div
        ref={indicatorRef}
        className="bg-primary absolute bottom-0 h-0.5 transition duration-200 ease-in-out"
      />
    </ul>
  );
};

export default DesktopMenu;
