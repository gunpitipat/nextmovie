import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getTopRatedTV } from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils/filterWithImages';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function TopRatedTV({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) notFound();

  const [config, topRatedData] = await Promise.all([
    getTMDBConfig(),
    getTopRatedTV(currentPage),
  ]);

  const totalPages = Math.min(topRatedData.total_pages, MAX_TMDB_PAGES);

  if (currentPage > totalPages) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const tvShows = filterWithImages(topRatedData.results);

  return (
    <section>
      <div className="max-w-content px-responsive mx-auto">
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">Top Rated TV Shows</h1>
            {currentPage > 1 && (
              <p className="text-muted mt-1 text-sm">Page {currentPage}</p>
            )}
          </div>
        </div>

        <div className="poster-grid mt-6">
          {tvShows.map((tv) => (
            <PosterCard
              key={tv.id}
              mediaType="tv"
              id={tv.id}
              title={tv.name}
              rating={tv.vote_average}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/tv/top-rated"
        />
      </div>
    </section>
  );
}

export default function Page({ searchParams }: PageProps<'/tv/top-rated'>) {
  return (
    <Suspense>
      <TopRatedTV searchParams={searchParams} />
    </Suspense>
  );
}
