import { TMDB_BASE_URL } from '../constants';

export async function fetchTMDB<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const message = await res.text().catch(() => res.statusText);
    throw new Error(`TMDB error ${res.status} on ${endpoint}: ${message}`);
  }

  return res.json();
}
