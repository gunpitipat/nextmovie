import { Suspense } from 'react';
import { getTMDBConfig, getPopularMovies } from '@/lib/tmdb';
import { filterWithImages } from '@/lib/utils/filterWithImages';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function PopularMovies({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const [config, popularData] = await Promise.all([
    getTMDBConfig(),
    getPopularMovies(currentPage),
  ]);

  const imageBaseUrl = config.images.secure_base_url;
  const movies = filterWithImages(popularData.results);
  const totalPages = Math.min(popularData.total_pages, MAX_TMDB_PAGES);

  return (
    <section>
      <div className="max-w-content px-responsive mx-auto">
        {/* Use poster-grid to align heading with the first column */}
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">Popular Movies</h1>
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
              rating={movie.vote_average}
              posterPath={movie.poster_path}
              imageBaseUrl={imageBaseUrl}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/movies/popular"
        />
      </div>
    </section>
  );
}

export default function Page({ searchParams }: PageProps<'/movies/popular'>) {
  return (
    <Suspense>
      <PopularMovies searchParams={searchParams} />
    </Suspense>
  );
}
