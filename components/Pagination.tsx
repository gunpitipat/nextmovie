import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

const Pagination = ({ currentPage, totalPages, basePath }: PaginationProps) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const previousPath = `${basePath}?page=${currentPage - 1}`;
  const nextPath = `${basePath}?page=${currentPage + 1}`;

  return (
    <div className="mt-14 flex -translate-x-2.5 items-center justify-center">
      <Link href={previousPath} className={`${isFirst ? 'hide' : 'show'} btn`}>
        Previous
      </Link>
      <span className="text-highlight mr-14 ml-12.5 text-base font-semibold">
        {currentPage}
      </span>
      <Link href={nextPath} className={`${isLast ? 'hide' : 'show'} btn`}>
        Next
      </Link>
    </div>
  );
};

export default Pagination;
