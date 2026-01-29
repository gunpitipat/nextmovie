'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useMounted } from '@/hooks/useMounted';
import { useTMDBConfig } from '@/contexts/tmdb-config-context';
import { getFavorites, groupFavoritesByDate } from '@/lib/favorites';
import { formatDateLongDMY } from '@/lib/utils';
import ThreeDots from '@/components/loading/ThreeDots';
import FavoriteCard from '@/components/FavoriteCard';

export default function Favorites() {
  const [favorites, setFavorites] = useState(getFavorites());
  const mounted = useMounted();
  const config = useTMDBConfig();

  useEffect(() => {
    const updateFavorites = () => {
      setFavorites(getFavorites());
    };

    // Update list on mount
    updateFavorites();

    window.addEventListener('favorites', updateFavorites);
    return () => window.removeEventListener('favorites', updateFavorites);
  }, []);

  if (!mounted) return <ThreeDots className="min-h-nav-offset" />;

  if (favorites.length === 0) {
    return (
      <section className="flex flex-col items-center gap-4">
        <h1 className="heading mt-14">No favorites yet</h1>
        <p className="text-secondary px-4 text-center text-base">
          <span>Save movies or TV shows to</span>
          <br className="xs:hidden" />
          <span> start building your list.</span>
        </p>
        <Link href="/" className="primary-btn mt-2 px-4 py-2.5">
          Discover Trending
        </Link>
      </section>
    );
  }

  const favoritesEntries = groupFavoritesByDate(favorites);
  const today = formatDateLongDMY(new Date().toISOString());
  const imageBaseUrl = config.images.secure_base_url;

  return (
    <section className="px-layout max-w-layout mx-auto">
      {/* Apply poster-grid to headings for left alignment with the centered grid */}
      <div className="poster-grid mt-8">
        <h1 className="heading col-span-full max-[360px]:text-center">
          My Favorites
        </h1>
      </div>

      {favoritesEntries.map(([date, items]) => (
        <div key={date} className="mt-8 nth-2:mt-7">
          <div className="poster-grid">
            <h2 className="text-secondary after:bg-secondary relative col-span-full pl-4 text-base/4.5 font-medium after:absolute after:top-0 after:left-0 after:h-full after:w-1 after:rounded-xs max-[360px]:pl-0 max-[360px]:text-center max-[360px]:after:hidden lg:text-lg/5">
              {date === today ? 'Added Today' : date}
            </h2>
          </div>

          <div className="poster-grid mt-6">
            {items.map((item) => (
              <FavoriteCard
                key={item.id}
                mediaType={item.mediaType}
                id={item.id}
                title={item.title}
                releaseYear={item.releaseYear}
                voteAverage={item.voteAverage}
                voteCount={item.voteCount}
                posterPath={item.posterPath}
                imageBaseUrl={imageBaseUrl}
                from="/favorites"
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
