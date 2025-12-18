import Link from 'next/link';

const DetailsButton = ({ href }: { href: string }) => {
  return (
    <Link href={href} className="primary-btn">
      View Details
    </Link>
  );
};

export default DetailsButton;
