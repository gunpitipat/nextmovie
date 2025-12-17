import { NAV_ITEMS, MOVIE_CATEGORIES, TV_CATEGORIES } from './constants';
import type { MenuItem } from '@/types';

type SectionPaths = Record<string, string[]>;
type ActiveNavState = {
  index: number;
  basePath: string | null;
};

const getBasePath = (pathname: string) => '/' + pathname.split('/')[1];

const SUBNAV_ITEMS: MenuItem[][] = [MOVIE_CATEGORIES, TV_CATEGORIES];

const getSectionPaths = () => {
  const sectionPaths = NAV_ITEMS.reduce<SectionPaths>((acc, item) => {
    acc[item.href] = [item.href];
    return acc;
  }, {});

  SUBNAV_ITEMS.forEach((items) => {
    const basePath = getBasePath(items[0].href);

    sectionPaths[basePath].push(
      ...items.map((item) => item.href),
      `${basePath}/genres/`
    );
  });

  return sectionPaths;
};

const sectionPaths = getSectionPaths();

export const getActiveNavState = (
  pathname: string,
  isNotFound: boolean
): ActiveNavState => {
  // isNotFound from context; filters out invalid dynamic routes (e.g. /movies/genres/unknown)
  if (isNotFound) return { index: -1, basePath: null };

  const basePath = getBasePath(pathname);
  const relatedPaths = sectionPaths[basePath];

  if (!relatedPaths) return { index: -1, basePath: null };

  const isExactMatch = relatedPaths.includes(pathname);
  const isGenresMatch = pathname.startsWith(`${basePath}/genres/`);

  if (
    relatedPaths.includes(`${basePath}/genres/`) &&
    !isExactMatch &&
    !isGenresMatch
  ) {
    return { index: -1, basePath: null };
  }

  return {
    index: NAV_ITEMS.findIndex((item) => item.href === basePath),
    basePath,
  };
};
