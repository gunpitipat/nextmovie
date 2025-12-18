import { Suspense } from 'react';

async function Movie({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <section>{id}</section>;
}

export default function Page({ params }: PageProps<'/movie/[id]'>) {
  return (
    <Suspense>
      <Movie params={params} />
    </Suspense>
  );
}
