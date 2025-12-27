import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getTMDBConfig, getMovieDetail } from '@/lib/tmdb';
import { formatReleaseYear } from '@/lib/utils/formatDate';
import { formatRuntime } from '@/lib/utils/formatRuntime';
import { formatVoteCount } from '@/lib/utils/formatVoteCount';
import { getTrailers } from '@/lib/utils/getTrailers';
import BackButton from '@/components/BackButton';
import DetailHeader from '@/components/details/DetailHeader';
import Trailer from '@/components/details/Trailer';
import Overview from '@/components/details/Overview';
import type { TMDBConfig, MovieDetail } from '@/types';

async function Movie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movieId = id.split('-')[0];

  let config: TMDBConfig;
  let movie: MovieDetail;

  try {
    [config, movie] = await Promise.all([
      getTMDBConfig(),
      getMovieDetail(movieId),
    ]);
  } catch (err) {
    if (err instanceof Error && err.message.includes('TMDB error 404')) {
      notFound();
    }
    throw err;
  }

  const posterPath = movie.poster_path;
  const backdropPath = movie.backdrop_path;

  if (!posterPath || !backdropPath) notFound();

  const imageBaseUrl = config.images.secure_base_url;
  const status = movie.status !== 'Released' ? movie.status : undefined;
  const directors = movie.credits.crew
    .filter((crew) => crew.job === 'Director')
    .map((director) => director.name);

  const trailers = getTrailers(movie.videos.results);

  return (
    <section className="flex flex-col items-center gap-10 lg:gap-12">
      <BackButton fallbackHref="/movies" />

      <DetailHeader
        imageBaseUrl={imageBaseUrl}
        posterPath={posterPath}
        backdropPath={backdropPath}
        title={movie.title}
        directors={directors}
        releaseYear={formatReleaseYear(movie.release_date)}
        status={status}
        runtime={formatRuntime(movie.runtime)}
        voteAverage={movie.vote_average.toFixed(1)}
        voteCount={formatVoteCount(movie.vote_count)}
        genres={movie.genres}
      />

      {trailers.length > 0 && <Trailer videos={trailers} />}

      <Overview overview={movie.overview} />
    </section>
  );
}

export default function Page({ params }: PageProps<'/movie/[id]'>) {
  return (
    <Suspense>
      <Movie params={params} />
    </Suspense>
  );
}
