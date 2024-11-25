/* eslint-disable @typescript-eslint/no-explicit-any */
export const setUser = (user: any) => ({
  type: "SET_USER",
  payload: user,
});

export const setFavorite = (favorite: any) => ({
  type: "SET_FAVORITE",
  payload: favorite,
});
