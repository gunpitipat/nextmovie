'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { OverlayScrollbars } from 'overlayscrollbars';
import 'overlayscrollbars/overlayscrollbars.css';
import type { Video } from '@/types';

interface TrailerThumbnailsProps {
  videos: Video[];
  activeId: string | null;
  onSelect: (video: Video) => void;
}

const TrailerThumbnails = ({
  videos,
  activeId,
  onSelect,
}: TrailerThumbnailsProps) => {
  const osInstanceRef = useRef<OverlayScrollbars>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = (id: string) => activeId === id;

  // Configure OverlayScrollbars
  useEffect(() => {
    if (!containerRef.current) return;

    osInstanceRef.current = OverlayScrollbars(containerRef.current, {});

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const setupScrollbar = (event: MediaQueryList | MediaQueryListEvent) => {
      if (!osInstanceRef.current) return;

      if (event.matches) {
        // Vertical list on desktop
        osInstanceRef.current.options({
          overflow: { x: 'hidden' },
          scrollbars: {
            theme: 'os-theme-custom',
            visibility: 'auto',
            autoHide: 'scroll',
            autoHideDelay: 800,
            autoHideSuspend: true,
          },
        });
      } else {
        // Simulate horizontal carousel on mobile and tablet
        osInstanceRef.current.options({
          overflow: { x: 'scroll' },
          scrollbars: { visibility: 'hidden' },
        });
      }
    };

    setupScrollbar(mediaQuery);
    mediaQuery.addEventListener('change', setupScrollbar);

    return () => {
      mediaQuery.removeEventListener('change', setupScrollbar);
      osInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-overlayscrollbars-initialize
      className="trailer-thumbnails lg:border-surface-3 lg:h-fit lg:max-h-[360px] lg:rounded-lg lg:border xl:max-h-[405px]"
    >
      <div className="xs:px-8 flex w-fit gap-2.5 px-4 md:px-12 lg:w-full lg:flex-col lg:py-1 lg:pr-4 lg:pl-1">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex max-w-35 flex-col gap-1 lg:max-w-none lg:flex-row lg:gap-2"
          >
            <button
              type="button"
              onClick={() => onSelect(video)}
              className={`${isActive(video.id) ? 'border-primary' : 'media-hover border-surface-1'} relative block aspect-video w-35 flex-none overflow-hidden rounded-lg border-2 transition-[filter,border-color] xl:w-[150px]`}
            >
              <Image
                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                alt={video.name}
                fill
                sizes="(max-width: 1279px) 140px, 150px"
                draggable={false}
                className="image-cover"
              />
            </button>
            <button
              type="button"
              onClick={() => onSelect(video)}
              className={`${isActive(video.id) ? 'text-highlight' : 'text-secondary hover:text-primary'} line-clamp-2 w-fit self-start text-start text-sm wrap-break-word transition-colors duration-200 ease-in-out lg:line-clamp-3`}
            >
              {video.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerThumbnails;
