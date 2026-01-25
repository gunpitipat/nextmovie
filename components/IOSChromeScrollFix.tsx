'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* 
  ** Workaround for iOS Chrome scroll bug on Next.js navigation

  On route change, the page may preserve or land at 
  an incorrect scroll position instead of scrolling to top.
  A Suspense-based solution was tested and did not resolve the issue.

  See: https://github.com/vercel/next.js/discussions/64435
*/

const IOSChromeScrollFix = () => {
  const pathname = usePathname();

  useEffect(() => {
    const ua = navigator.userAgent;
    const isIOS = /iPhone|iPad/.test(ua);
    const isIOSChrome = isIOS && /CriOS/.test(ua);

    if (!isIOSChrome) return;

    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
};

export default IOSChromeScrollFix;
