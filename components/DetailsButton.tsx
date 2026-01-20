import Link from 'next/link';

interface DetailsButtonProps {
  pathname: string;
  from?: string;
  className?: string;
}

const DetailsButton = ({ pathname, from, className }: DetailsButtonProps) => {
  const href = {
    pathname,
    query: from ? { from } : undefined,
  };

  return (
    <Link href={href} className={`${className ?? ''}`}>
      View Details
    </Link>
  );
};

export default DetailsButton;
