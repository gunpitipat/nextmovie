import type { Cast } from '@/types';

export function getTopCast(people: Cast[], limit = 16): Cast[] {
  return people
    .filter((person) => person.known_for_department === 'Acting')
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
}
