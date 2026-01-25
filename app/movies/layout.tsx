import { getGenres } from '@/lib/tmdb';
import { MOVIE_CATEGORIES } from '@/lib/constants';
import SegmentRemount from '@/components/SegmentRemount';
import Subnav from '@/components/subnav/Subnav';

export default async function MoviesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const movieGenres = await getGenres('movie');

  return (
    <>
      <SegmentRemount>
        <Subnav
          basePath="/movies"
          categories={MOVIE_CATEGORIES}
          genres={movieGenres.genres}
        />
      </SegmentRemount>

      <div className="pt-14">{children}</div>
    </>
  );
}
