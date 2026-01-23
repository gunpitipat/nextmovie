import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, searchMedia } from '@/lib/tmdb';
import {
  filterWithImages,
  formatReleaseYear,
  formatVoteCount,
} from '@/lib/utils';
import { MAX_TMDB_PAGES } from '@/lib/constants';
import ThreeDots from '@/components/loading/ThreeDots';
import MediaListItem from '@/components/MediaListItem';
import Pagination from '@/components/Pagination';

async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;

  if (!q || !q.trim()) notFound();

  const query = q.trim();
  const currentPage = Number(page) || 1;

  if (currentPage < 1 || currentPage > MAX_TMDB_PAGES) notFound();

  const [config, searchResults] = await Promise.all([
    getTMDBConfig(),
    searchMedia(query, currentPage),
  ]);

  const totalPages = Math.min(searchResults.total_pages, MAX_TMDB_PAGES);

  if (currentPage > totalPages) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const filteredResults = filterWithImages(searchResults.results);

  return (
    <section className="animate-fade-in">
      <div className="px-content max-w-content mx-auto">
        <h1 className="heading mt-8">Results for “{query}”</h1>
        {currentPage > 1 && (
          <p className="text-muted mt-1 text-sm">Page {currentPage}</p>
        )}

        <div className="mt-6">
          {filteredResults.length > 0 ? (
            <ul className="space-y-4">
              {filteredResults.map((item) => (
                <li key={item.id}>
                  <MediaListItem
                    mediaType={item.media_type}
                    id={item.id}
                    title={item.media_type === 'movie' ? item.title : item.name}
                    releaseYear={formatReleaseYear(
                      item.media_type === 'movie'
                        ? item.release_date
                        : item.first_air_date
                    )}
                    voteAverage={item.vote_average.toFixed(1)}
                    voteCount={formatVoteCount(item.vote_count)}
                    posterPath={item.poster_path}
                    imageBaseUrl={imageBaseUrl}
                    from={`/search?q=${query}&page=${currentPage}`}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-secondary text-base">
              No movies or TV shows found on this page.
              {currentPage < totalPages && <span> Try the next page.</span>}
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/search?q=${query}`}
          />
        )}
      </div>
    </section>
  );
}

export default function Page({ searchParams }: PageProps<'/search'>) {
  return (
    <Suspense fallback={<ThreeDots className="min-h-nav-offset" />}>
      <Search searchParams={searchParams} />
    </Suspense>
  );
}
