import Link from 'next/link';

interface DetailsButtonProps {
  pathname: string;
  from?: string;
}

const DetailsButton = ({ pathname, from }: DetailsButtonProps) => {
  const href = {
    pathname,
    query: from ? { from } : undefined,
  };

  return (
    <Link href={href} className="primary-btn">
      View Details
    </Link>
  );
};

export default DetailsButton;
