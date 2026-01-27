import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getGenres, getMoviesByGenre } from '@/lib/tmdb';
import { slugify, filterWithImages, formatReleaseYear } from '@/lib/utils';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import ThreeDots from '@/components/loading/ThreeDots';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function GenreMovies({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const genres = await getGenres('movie');

  const matchedGenre = genres.genres.find(
    (genre) => slugify(genre.name) === slug
  );

  if (!matchedGenre) notFound();

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) notFound();

  const [config, genreMoviesData] = await Promise.all([
    getTMDBConfig(),
    getMoviesByGenre(matchedGenre.id, currentPage),
  ]);

  const totalPages = Math.min(genreMoviesData.total_pages, MAX_TMDB_PAGES);

  if (currentPage > totalPages) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const movies = filterWithImages(genreMoviesData.results);

  return (
    <section>
      <div className="max-w-layout px-layout mx-auto">
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">{matchedGenre.name} Movies</h1>
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
              from={`/movies/genres/${slug}?page=${currentPage}`}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/movies/genres/${slug}`}
        />
      </div>
    </section>
  );
}

export default function Page({
  params,
  searchParams,
}: PageProps<'/movies/genres/[slug]'>) {
  return (
    <Suspense fallback={<ThreeDots className="min-h-subnav-offset" />}>
      <GenreMovies params={params} searchParams={searchParams} />
    </Suspense>
  );
}
