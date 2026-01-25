'use client';

import { usePathname } from 'next/navigation';

const SegmentRemount = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Use key={pathname} to force remount on route change,
  // preventing stale states (e.g., incorrect carousel button visibility or subnav hiding).
  return <div key={pathname}>{children}</div>;
};

export default SegmentRemount;
