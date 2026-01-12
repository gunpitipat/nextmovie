'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import { DELIMITER } from '@/lib/utils';

interface BackButtonProps {
  fallbackHref?: string;
}

const BackButton = ({ fallbackHref = '/' }: BackButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  let immediate: string | undefined;
  let remaining: string | undefined;

  if (from) {
    const idx = from.indexOf(DELIMITER);
    if (idx !== -1) {
      immediate = from.slice(0, idx);
      remaining = from.slice(idx + DELIMITER.length);
    } else {
      immediate = from;
      remaining = undefined;
    }
  }

  const handleBack = () => {
    if (immediate?.startsWith('/')) {
      if (remaining) {
        const joiner = immediate.includes('?') ? '&' : '?';
        const href = `${immediate}${joiner}from=${encodeURIComponent(remaining)}`;
        router.push(href);
      } else {
        router.push(immediate);
      }
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <div className="max-w-layout pointer-events-none fixed top-15 left-1/2 z-40 w-full -translate-x-1/2">
      <button
        type="button"
        onClick={handleBack}
        className="hover:text-highlight pointer-events-auto absolute top-0 ml-4 flex size-12 -translate-x-[25%] items-center justify-center rounded-full opacity-90 transition duration-200 ease-in-out hover:opacity-100 sm:ml-6 lg:ml-8 lg:size-10"
      >
        <FaChevronLeft className="size-6 lg:size-5" />
      </button>
    </div>
  );
};

export default BackButton;
