import { getGenres } from '@/lib/tmdb';
import { MOVIE_CATEGORIES } from '@/lib/constants';
import SubnavWrapper from '@/components/subnav/SubnavWrapper';

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const movieGenres = await getGenres('movie');

  return (
    <>
      <SubnavWrapper
        basePath="/movies"
        categories={MOVIE_CATEGORIES}
        genres={movieGenres.genres}
      />
      <div className="pt-14">{children}</div>
    </>
  );
}
