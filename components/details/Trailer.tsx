'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import TrailerThumbnails from './TrailerThumbnails';
import type { Video } from '@/types';

interface TrailerProps {
  videos: Video[];
}

type VideoLayer = {
  video: Video;
  role: 'active' | 'pending';
};

const Trailer = ({ videos }: TrailerProps) => {
  const [videoLayers, setVideoLayers] = useState<VideoLayer[]>([
    { video: videos[0], role: 'active' },
  ]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeVideo = videoLayers.find((layer) => layer.role === 'active');
  const hasMultipleVideos = videos.length > 1;

  const handleSelect = (video: Video) => {
    setVideoLayers((layers) => {
      // Avoid queueing same video
      if (layers.some((layer) => layer.video.id === video.id)) {
        return layers;
      }

      return [...layers, { video, role: 'pending' }];
    });
  };

  const promotePending = () => {
    setVideoLayers((layers) => {
      const pending = layers.find((layer) => layer.role === 'pending');
      if (!pending) return layers;

      return [{ video: pending.video, role: 'active' }];
    });
  };

  return (
    <div className="max-w-content flex w-full flex-col gap-5 lg:flex-row lg:px-16 xl:px-18">
      <div className="xs:px-8 w-full px-4 md:px-12 lg:px-0">
        <h2 className="heading heading-bar">Trailer</h2>
        <div
          // Use :after for responsive backdrop behind the centered 16:9 video
          className={`sm:after:border-surface-3 relative mt-6 sm:after:absolute sm:after:top-0 sm:after:left-0 sm:after:-z-1 sm:after:h-[315px] sm:after:w-full sm:after:rounded-lg sm:after:border sm:after:bg-black md:after:h-[360px] ${hasMultipleVideos ? 'lg:after:hidden' : 'xl:after:h-[405px]'}`}
        >
          <div
            className={`border-surface-3 relative mx-auto aspect-video w-full overflow-hidden rounded-lg border bg-black sm:w-[560px] sm:rounded-none sm:border-x-0 md:w-[640px] ${hasMultipleVideos ? 'lg:mx-0 lg:rounded-lg lg:border-x' : ''} xl:w-[720px]`}
          >
            {videoLayers.map(({ video, role }) => (
              <motion.iframe
                key={video.id}
                src={`https://www.youtube.com/embed/${video.key}?rel=0`}
                title={video.name}
                className={`absolute inset-0 size-full ${role === 'active' ? 'z-10' : 'z-0'} ${isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onLoad={() => {
                  if (role === 'pending') setIsTransitioning(true); // When pending iframe is ready, start fading out active iframe
                }}
                // Motion
                initial={false}
                animate={{
                  opacity: isTransitioning && role === 'active' ? 0 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                onAnimationComplete={() => {
                  if (isTransitioning && role === 'active') {
                    promotePending(); // Unmount old active iframe and promote new one
                    setIsTransitioning(false);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {hasMultipleVideos && (
        <div
          className="w-full lg:mt-[calc(20px+24px)]" // lg:mt-(heading size + gap)
        >
          <TrailerThumbnails
            videos={videos}
            activeId={activeVideo?.video.id ?? null}
            onSelect={handleSelect}
          />
        </div>
      )}
    </div>
  );
};

export default Trailer;
