'use client';

import { usePathname } from 'next/navigation';
import MediaCarousel from './MediaCarousel';

const MediaCarouselWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Use key={pathname} to force fresh remount on route change,
  // avoiding stale carousel state (e.g., currentIdx),
  // which would otherwise cause incorrect prev/next button visibility.
  return <MediaCarousel key={pathname}>{children}</MediaCarousel>;
};

export default MediaCarouselWrapper;
