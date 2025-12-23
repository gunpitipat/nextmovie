export interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
  popularity: number;
}

export interface Cast extends Person {
  character: string;
  order: number;
}

export interface Crew extends Person {
  department: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}
