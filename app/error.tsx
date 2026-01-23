'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center gap-4">
      <h1 className="heading mt-14">Something went wrong</h1>
      <p className="text-secondary px-4 text-center text-base">
        <span>An unexpected error occurred.</span>
        <br className="xs:hidden" />
        <span> Please try again later.</span>
      </p>
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="primary-btn w-32 py-2.5"
        >
          Try again
        </button>
        <Link href="/" className="secondary-btn w-32 py-2.5 text-center">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
