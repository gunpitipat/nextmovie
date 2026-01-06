import type { Cast, TVRole } from '@/types';

export function getTopCast<T extends Cast>(people: T[], limit = 16): T[] {
  return people
    .filter((person) => person.known_for_department === 'Acting')
    .toSorted((a, b) => a.order - b.order)
    .slice(0, limit);
}

export function formatTVRoles(roles: TVRole[], limit = 3): string {
  return roles
    .toSorted((a, b) => b.episode_count - a.episode_count)
    .slice(0, limit)
    .map((role) => role.character)
    .join(' / ');
}
