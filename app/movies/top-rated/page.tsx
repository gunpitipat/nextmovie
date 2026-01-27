import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getTopRatedMovies } from '@/lib/tmdb';
import { filterWithImages, formatReleaseYear } from '@/lib/utils';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import ThreeDots from '@/components/loading/ThreeDots';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function TopRatedMovies({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  // Prevent TMDB 400 errors from invalid pages
  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) {
    notFound();
  }

  const [config, topRatedData] = await Promise.all([
    getTMDBConfig(),
    getTopRatedMovies(currentPage),
  ]);

  // Limit total pages; TMDB may return impractical total_pages
  const totalPages = Math.min(topRatedData.total_pages, MAX_TMDB_PAGES);

  // Prevent pages from showing empty data
  if (currentPage > totalPages) {
    notFound();
  }

  const imageBaseUrl = config.images.secure_base_url;
  const movies = filterWithImages(topRatedData.results);

  return (
    <section>
      <div className="max-w-layout px-layout mx-auto">
        {/* Use poster-grid to align heading with the first column */}
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">Top Rated Movies</h1>
            {currentPage > 1 && (
              <p className="text-muted mt-1 text-sm">Page {currentPage}</p>
            )}
          </div>
        </div>

        <div className="poster-grid mt-6">
          {movies.map((movie) => (
            <PosterCard
              key={movie.id}
              mediaType="movie"
              id={movie.id}
              title={movie.title}
              releaseYear={formatReleaseYear(movie.release_date)}
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
              from={`/movies/top-rated?page=${currentPage}`}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/movies/top-rated"
        />
      </div>
    </section>
  );
}

export default function Page({ searchParams }: PageProps<'/movies/top-rated'>) {
  return (
    <Suspense fallback={<ThreeDots className="min-h-subnav-offset" />}>
      <TopRatedMovies searchParams={searchParams} />
    </Suspense>
  );
}
