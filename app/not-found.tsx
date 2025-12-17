'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useNotFound } from '@/contexts/not-found-context';

export default function NotFound() {
  const { setIsNotFound } = useNotFound();

  useEffect(() => {
    setIsNotFound(true);
    return () => setIsNotFound(false);
  }, [setIsNotFound]);

  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="heading mt-14">Page Not Found</h1>
      <p className="text-secondary px-4 text-center text-base">
        The page you are looking for does not exist or is temporarily
        unavailable.
      </p>
      <Link href="/" className="primary-btn mt-2">
        Back to Home
      </Link>
    </section>
  );
}
