import Image from 'next/image';
import Link from 'next/link';

const TMDBAttribution = () => {
  return (
    <div className="mb-2 flex flex-col items-center gap-2 md:flex-row md:justify-center">
      <Link href="https://www.themoviedb.org">
        <Image
          src="/images/tmdb-logo.svg"
          alt="TMDB logo"
          width={108}
          height={14}
          className="block h-auto object-contain"
        />
      </Link>
      <p className="text-muted text-center text-sm">
        This product uses the TMDB API&nbsp;
        <br className="sm:hidden" />
        but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
};

export default TMDBAttribution;
