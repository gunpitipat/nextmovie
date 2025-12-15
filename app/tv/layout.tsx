import { getGenres } from '@/lib/tmdb';
import { TV_CATEGORIES } from '@/lib/constants';
import SubnavWrapper from '@/components/subnav/SubnavWrapper';

export default async function TVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tvGenres = await getGenres('tv');

  return (
    <>
      <SubnavWrapper
        basePath="/tv"
        categories={TV_CATEGORIES}
        genres={tvGenres.genres}
      />
      <div className="pt-14">{children}</div>
    </>
  );
}
