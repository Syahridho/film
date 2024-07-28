import axios from "axios";

const apiKey = import.meta.env.VITE_APP_APIKEY;
const baseUrl = import.meta.env.VITE_APP_BASEURL;

export const getMoviePopular = async () => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?page=1&api_key=${apiKey}`
  );
  return movie;
};

export const searchMovie = async (q: string) => {
  const search = await axios.get(
    `${baseUrl}/search/movie?query=${q}&api_key=${apiKey}`
  );
  return search.data;
};

export const getDetailMovie = async (id: string) => {
  const detail = await axios.get(`${baseUrl}/movie/${id}?api_key=${apiKey}`);
  return detail;
};

export const getMovieList = async () => {
  const movie = await axios.get(
    `${baseUrl}/movie/popular?page=2&api_key=${apiKey}`
  );
  return movie;
};

export const getMovieGenre = async () => {
  const genre = await axios.get(
    `${baseUrl}/genre/movie/list?api_key=${apiKey}`
  );
  return genre;
};

export const getMovieByGenre = async (genreId: string) => {
  const movie = await axios.get(
    `${baseUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
  );
  return movie;
};
