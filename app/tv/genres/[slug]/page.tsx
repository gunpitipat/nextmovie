import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getGenres, getTVShowsByGenre } from '@/lib/tmdb';
import { slugify, filterWithImages } from '@/lib/utils';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import Pagination from '@/components/Pagination';
import PosterCard from '@/components/PosterCard';

async function GenreTVShows({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const genres = await getGenres('tv');

  const matchedGenre = genres.genres.find(
    (genre) => slugify(genre.name) === slug
  );

  if (!matchedGenre) notFound();

  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) notFound();

  const [config, genreTVShowsData] = await Promise.all([
    getTMDBConfig(),
    getTVShowsByGenre(matchedGenre.id, currentPage),
  ]);

  const totalPages = Math.min(genreTVShowsData.total_pages, MAX_TMDB_PAGES);

  if (currentPage > totalPages) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const tvShows = filterWithImages(genreTVShowsData.results);

  return (
    <section>
      <div className="max-w-layout px-layout mx-auto">
        <div className="poster-grid mt-8">
          <div className="col-span-full max-[360px]:text-center">
            <h1 className="heading">{matchedGenre.name} TV Shows</h1>
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
              from={`/tv/genres/${slug}?page=${currentPage}`}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/tv/genres/${slug}`}
        />
      </div>
    </section>
  );
}

export default function Page({
  params,
  searchParams,
}: PageProps<'/tv/genres/[slug]'>) {
  return (
    <Suspense>
      <GenreTVShows params={params} searchParams={searchParams} />
    </Suspense>
  );
}
