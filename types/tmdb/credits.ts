export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface CreditPerson extends Person {
  known_for_department: string;
  popularity: number;
}

export interface Cast extends CreditPerson {
  order: number;
}

export interface Crew extends CreditPerson {
  department: string;
  job: string;
}

export interface MovieCast extends Cast {
  character: string;
}

export interface MovieCredits {
  cast: MovieCast[];
  crew: Crew[];
}

export interface TVRole {
  character: string;
  episode_count: number;
}

export interface TVCast extends Cast {
  roles: TVRole[];
  total_episode_count: number;
}

export interface TVCrew extends Crew {
  total_episode_count: number;
}

export interface AggregateTVCrew extends Omit<Crew, 'job'> {
  jobs: { job: string; episode_count: number }[];
  total_episode_count: number;
}

export interface TVAggregateCredits {
  cast: TVCast[];
  crew: AggregateTVCrew[];
}
