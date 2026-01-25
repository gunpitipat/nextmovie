import { getGenres } from '@/lib/tmdb';
import { TV_CATEGORIES } from '@/lib/constants';
import SegmentRemount from '@/components/SegmentRemount';
import Subnav from '@/components/subnav/Subnav';

export default async function TVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tvGenres = await getGenres('tv');

  return (
    <>
      <SegmentRemount>
        <Subnav
          basePath="/tv"
          categories={TV_CATEGORIES}
          genres={tvGenres.genres}
        />
      </SegmentRemount>

      <div className="pt-14">{children}</div>
    </>
  );
}
