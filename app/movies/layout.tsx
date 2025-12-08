import { getGenres } from '@/lib/tmdb';
import { MOVIE_CATEGORIES } from '@/lib/constants';
import Subnav from '@/components/subnav/Subnav';

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const movieGenres = await getGenres('movie');

  return (
    <>
      <Subnav
        basePath="/movies"
        categories={MOVIE_CATEGORIES}
        genres={movieGenres.genres}
      />
      {children}
    </>
  );
}
