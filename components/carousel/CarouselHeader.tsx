import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface CarouselHeaderProps {
  title: string;
  href?: string;
}

const CarouselHeader = ({ title, href }: CarouselHeaderProps) => {
  const Heading = (
    <h2 className="ml-4 text-lg leading-none font-semibold sm:ml-6 lg:ml-8 lg:text-xl">
      {title}
    </h2>
  );

  if (!href) return Heading;

  return (
    <div className="flex items-center justify-between">
      {Heading}
      <Link
        href={href}
        className="text-secondary link-hover mr-4 flex items-center gap-1 text-sm sm:mr-6 lg:mr-8"
      >
        View all
        <FaArrowRight className="size-3" />
      </Link>
    </div>
  );
};

export default CarouselHeader;
