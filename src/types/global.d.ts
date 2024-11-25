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

interface AppState {
  user: userTypes | null;
  favorite: favoriteType | null;
}

interface Action {
  type: string;
  payload: userTypes | favoriteType | null;
}

export interface CodedError extends Error {
  code: string;
}