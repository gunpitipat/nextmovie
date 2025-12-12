'use client';

import { usePathname } from 'next/navigation';
import Subnav from './Subnav';

const SubnavWrapper = (props: React.ComponentProps<typeof Subnav>) => {
  const pathname = usePathname();

  // Use key={pathname} to force fresh remount on route change,
  // preventing stale state (e.g., incorrect subnav hiding).
  return <Subnav key={pathname} {...props} />;
};

export default SubnavWrapper;
