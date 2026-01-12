import type { TVSeason, TVDetail } from '@/types';

export function getSeasonNumbers(seasons: TVSeason[]): number[] {
  return seasons
    .filter((season) => season.season_number > 0 && season.episode_count > 0)
    .map((season) => season.season_number)
    .toSorted((a, b) => a - b);
}

export function getDefaultSeasonNumber(tvDetail: TVDetail): number | null {
  const seasonNumbers = getSeasonNumbers(tvDetail.seasons);
  if (seasonNumbers.length === 0) return null;

  const maxSeason = Math.max(...seasonNumbers);

  const nextSeason = tvDetail.next_episode_to_air?.season_number;
  if (nextSeason && seasonNumbers.includes(nextSeason)) return nextSeason;

  const lastSeason = tvDetail.last_episode_to_air?.season_number;
  if (lastSeason && seasonNumbers.includes(lastSeason)) return lastSeason;

  return maxSeason;
}
