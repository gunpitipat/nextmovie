import type { Crew, TVCrew, AggregateTVCrew } from '@/types';

// Use `job` for grouping; TMDB's `known_for_department` and `department` are inconsistent and not specific enough.
const CREW_GROUPS = {
  directors: ['Director', 'Co-Director'],
  writers: [
    'Screenplay',
    'Story',
    'Characters',
    'Writer',
    'Original Story',
    'Teleplay',
    'Staff Writer',
    'Executive Story Editor',
    'Story Editor',
  ],
  producers: [
    'Executive Producer',
    'Co-Executive Producer',
    'Supervising Producer',
    'Producer',
    'Co-Producer',
  ],
  composers: ['Original Music Composer', 'Music Composer'],
  cinematographers: ['Director of Photography', 'Director of Cinematography'],
  editors: ['Editor'],
  casting: ['Casting', 'Casting Director'],
  production_designers: ['Production Design', 'Production Designer'],
  art_directors: ['Art Direction', 'Art Director', 'Supervising Art Director'],
  animation_directors: [
    'Animation Direction',
    'Animation Director',
    'Supervising Animation Director',
  ],
  action_directors: ['Action Direction', 'Action Director'],
  costume_designers: [
    'Costume Design',
    'Costume Designer',
    'Co-Costume Designer',
  ],
  sound: [
    'Sound Direction',
    'Sound Director',
    'Supervising Sound Editor',
    'Sound Designer',
  ],
  visual_effects: [
    'Visual Effects Supervisor',
    'Senior Visual Effects Supervisor',
    'CGI Director',
    'CG Supervisor',
  ],
} as const;

export type CrewGroup = keyof typeof CREW_GROUPS;

const CREW_GROUP_ORDER = Object.keys(CREW_GROUPS) as CrewGroup[];

// Reverse CREW_GROUPS into a lookup map (e.g. { "Screenplay": "writers", "Story": "writers", ... })
const CREW_LOOKUP: Record<string, CrewGroup> = Object.fromEntries(
  Object.entries(CREW_GROUPS).flatMap(([group, jobs]) =>
    jobs.map((job) => [job, group as CrewGroup])
  )
);

// Normalize aggregate jobs to single primary job
export function normalizeAggregateTVCrew(people: AggregateTVCrew[]): TVCrew[] {
  return people.map((person) => {
    const sortedJobs = person.jobs.toSorted(
      (a, b) => b.episode_count - a.episode_count
    );

    const primaryJob =
      sortedJobs.find((item) => CREW_LOOKUP[item.job]) ?? sortedJobs[0];

    return { ...person, job: primaryJob.job };
  });
}

const groupKeyCrew = <T extends Crew>(
  people: T[]
): Partial<Record<CrewGroup, T[]>> => {
  const keyCrew = people.filter((person) => CREW_LOOKUP[person.job]);
  const groupedCrew = Object.groupBy(
    keyCrew,
    (person) => CREW_LOOKUP[person.job]
  );

  // Remove duplicate crew per group
  for (const group of Object.keys(groupedCrew) as CrewGroup[]) {
    const crew = groupedCrew[group]!;
    const uniqueIds = new Set<number>();

    groupedCrew[group] = crew.filter((person) => {
      if (uniqueIds.has(person.id)) return false;
      uniqueIds.add(person.id);
      return true;
    });
  }

  return groupedCrew;
};

export type KeyCrewEntry<T extends Crew> = [CrewGroup, T[]];

export function getKeyCrewEntries<T extends Crew>(
  people: T[]
): KeyCrewEntry<T>[] {
  const groupedCrew = groupKeyCrew(people);

  return CREW_GROUP_ORDER.flatMap((group) => {
    const crew = groupedCrew[group];
    if (!crew) return [];

    return [[group, crew]];
  });
}

export function formatGroupName(group: CrewGroup): string {
  return group
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
