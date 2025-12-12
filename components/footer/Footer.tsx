import TMDBAttribution from './TMDBAttribution';

const Footer = () => {
  return (
    <footer className="border-surface-3 mx-auto mt-14 w-fit border-t px-4 py-6 md:py-4 lg:mt-16">
      <TMDBAttribution />

      <div className="text-center text-sm">
        &copy; 2025 Pitipat Pattamawilai.&nbsp;
        <br className="min-[360px]:hidden" />
        All Rights Reserved.
      </div>

      <div className="footer-spacer" />
    </footer>
  );
};

export default Footer;
