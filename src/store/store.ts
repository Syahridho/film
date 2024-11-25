import { userTypes } from "@/types/global";
import { createStore } from "redux";

// Definisikan tipe untuk state
interface AppState {
  user: userTypes | null;
  favorite: favoriteType | null; // Gantilah favoriteType dengan tipe yang sesuai
}

// Definisikan tipe untuk Action
interface SetUserAction {
  type: "SET_USER";
  payload: userTypes;
}

interface ClearUserAction {
  type: "CLEAR_USER";
  payload: null;
}

interface SetFavoriteAction {
  type: "SET_FAVORITE";
  payload: favoriteType;
}

// Gabungkan semua action dalam tipe Action
type Action = SetUserAction | ClearUserAction | SetFavoriteAction;

// Definisikan favoriteType sebagai contoh
type favoriteType = Movie[]; // Gantilah sesuai dengan tipe favorite Anda, seperti array of Movie

// Tipe Movie untuk contoh
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const user: string | null = localStorage.getItem("user");

let data: userTypes | null = null;

if (user) {
  data = JSON.parse(user);
}

const initialState: AppState = {
  user: data,
  favorite: null,
};

const reducer = (state = initialState, action: Action): AppState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return { ...state, user: null };
    case "SET_FAVORITE":
      return { ...state, favorite: action.payload };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
