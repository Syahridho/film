export interface MovieTypes {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface userTypes {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

export interface AppState {
  favorite: Movie[];
  user: userTypes | null
}

export interface Genre {
  id: number;
  name: string;
}

interface Action {
  type: string;
  payload: userTypes | favoriteType | null;
}

export interface CodedError extends Error {
  code: string;
}
