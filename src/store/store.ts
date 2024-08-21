import { createStore } from "redux";

const user: any = localStorage.getItem("user");

const data = JSON.parse(user);

const initialState = {
  user: data,
  favorite: null,
};

const reducer = (state = initialState, action: any) => {
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
