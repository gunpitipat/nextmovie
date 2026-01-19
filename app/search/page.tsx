import { Suspense } from 'react';
import { notFound } from 'next/navigation';

async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;

  if (!q || !q.trim()) notFound();

  const query = q.trim();
  const currentPage = Number(page) || 1;

  return <section>{query}</section>;
}

export default function Page({ searchParams }: PageProps<'/search'>) {
  return (
    <Suspense>
      <Search searchParams={searchParams} />
    </Suspense>
  );
}
