import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getPopularTV } from '@/lib/tmdb';
import { filterWithImages, formatReleaseYear } from '@/lib/utils';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import ThreeDots from '@/components/loading/ThreeDots';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function PopularTV({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) notFound();

  const [config, popularData] = await Promise.all([
    getTMDBConfig(),
    getPopularTV(currentPage),
  ]);

  const totalPages = Math.min(popularData.total_pages, MAX_TMDB_PAGES);

  if (currentPage > totalPages) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const tvShows = filterWithImages(popularData.results);

  return (
    <section>
      <div className="max-w-layout px-layout mx-auto">
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">Popular TV Shows</h1>
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
              releaseYear={formatReleaseYear(tv.first_air_date)}
              voteAverage={tv.vote_average}
              voteCount={tv.vote_count}
              posterPath={tv.poster_path}
              imageBaseUrl={imageBaseUrl}
              from={`/tv/popular?page=${currentPage}`}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/tv/popular"
        />
      </div>
    </section>
  );
}

export default function Page({ searchParams }: PageProps<'/tv/popular'>) {
  return (
    <Suspense fallback={<ThreeDots className="min-h-subnav-offset" />}>
      <PopularTV searchParams={searchParams} />
    </Suspense>
  );
}
