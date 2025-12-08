import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    const updateMatch = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    updateMatch(mediaQuery); // Initial check
    mediaQuery.addEventListener('change', updateMatch);

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [query]);

  return matches;
}
