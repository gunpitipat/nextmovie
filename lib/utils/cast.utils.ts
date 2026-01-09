import type { MovieCast, TVCast, TVRole } from '@/types';

export function getTopCast(people: MovieCast[], limit?: number): MovieCast[];
export function getTopCast(people: TVCast[], limit?: number): TVCast[];
export function getTopCast(people: (MovieCast | TVCast)[], limit = 16) {
  return people
    .filter((person) => person.known_for_department === 'Acting')
    .toSorted((a, b) => {
      if ('total_episode_count' in a && 'total_episode_count' in b) {
        return b.total_episode_count - a.total_episode_count;
      }
      return a.order - b.order;
    })
    .slice(0, limit);
}

export function formatTVRoles(roles: TVRole[], limit = 2): string {
  return roles
    .toSorted((a, b) => b.episode_count - a.episode_count)
    .slice(0, limit)
    .map((role) => role.character)
    .join(' / ');
}
