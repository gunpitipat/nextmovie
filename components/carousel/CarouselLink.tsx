'use client';

import { useRouter } from 'next/navigation';

interface CarouselLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

// Keen Slider suppresses clicks inside slides after drag (wheel) interactions.
// Link navigation and onClick don't work, so trigger interactions in the capture phase instead.
const CarouselLink = ({
  href,
  className = '',
  children,
}: CarouselLinkProps) => {
  const router = useRouter();

  return (
    <div
      className={`${className} cursor-pointer`}
      onClickCapture={() => router.push(href)}
    >
      {children}
    </div>
  );
};

export default CarouselLink;
