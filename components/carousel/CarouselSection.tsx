import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import type { SectionSpacing } from '@/types';

interface CarouselSectionProps {
  title: string;
  href?: string;
  className?: string;
  spacing?: SectionSpacing;
  children: React.ReactNode;
}

const CarouselSection = ({
  title,
  href,
  className,
  spacing = 'layout',
  children,
}: CarouselSectionProps) => {
  const maxWidth = spacing === 'layout' ? 'max-w-layout' : 'max-w-content';
  const headingPaddingX = spacing === 'layout' ? 'px-layout' : 'px-content';
  const carouselPaddingX =
    spacing === 'layout' ? 'lg:px-8' : 'lg:px-16 xl:px-18';
  const linkMarginX = spacing === 'layout' ? 'mr-4 sm:mr-6 lg:mr-8' : '';

  const Heading = <h2 className={`heading ${headingPaddingX}`}>{title}</h2>;

  return (
    <div
      className={`mx-auto flex w-full flex-col gap-6 ${maxWidth} ${className ?? ''}`}
    >
      {!href ? (
        Heading
      ) : (
        <div className="flex items-center justify-between">
          {Heading}
          <Link
            href={href}
            className={`text-secondary link-hover flex items-center gap-1 text-sm ${linkMarginX}`}
          >
            View all
            <FaArrowRight className="size-3" />
          </Link>
        </div>
      )}

      <div className={`w-full ${carouselPaddingX}`}>{children}</div>
    </div>
  );
};

export default CarouselSection;
