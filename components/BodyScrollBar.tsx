'use client';

import { useEffect } from 'react';
import { OverlayScrollbars, ClickScrollPlugin } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';

export default function BodyScrollBar() {
  useEffect(() => {
    // Use native scrollbars on touch devices to avoid double-scrollbar issues (especially on iOS)
    if (matchMedia('(pointer: coarse)').matches) return;

    OverlayScrollbars.plugin(ClickScrollPlugin);

    // Use vanilla OverlayScrollbars instead of the React component/hook
    // because those require wrapping or attaching a ref to <body>,
    // which would force the root layout to become a client component.
    OverlayScrollbars(document.body, {
      overflow: { x: 'hidden' },
      scrollbars: {
        theme: 'os-theme-custom',
        autoHide: 'scroll',
        autoHideDelay: 800,
        clickScroll: true,
      },
    });
  }, []);

  return null;
}
