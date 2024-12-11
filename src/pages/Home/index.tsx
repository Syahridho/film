import "react-multi-carousel/lib/styles.css";
import {
  getMovieList,
  searchMovie,
  getMoviePopular,
  getMovieGenre,
  getMovieByGenre,
  getFilmById,
} from "./../../services/api";
import React, { Suspense, useEffect, useState } from "react";
import CardListSkeleton from "../../components/fragments/CardListSkeleton";
import CarsList from "../../components/fragments/CarsList";
import Footer from "../../components/layout/FooterLayout";
import WaterMark from "../../components/element/WaterMark";
import GenreList from "../../components/fragments/GenreList";
import Navbar from "../../components/layout/Navbar";
import SearchHero from "../../components/fragments/SearchHero";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite, setUser } from "../../store/action";
import { getUserFavorites } from "../../services/firebase/services";
import { Genre, MovieTypes } from "@/types/global";

const CardListCarousel = React.lazy(
  () => import("../../components/fragments/CardListCarousel")
);

const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<MovieTypes[]>([]);
  const [searchMovies, setSearchMovies] = useState<MovieTypes[]>([]);
  const [populars, setPopulars] = useState<MovieTypes[]>([]);
  const [selectGenres, setSelectGenres] = useState<number | string>();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSearch = async () => {
    if (search.length > 3) {
      await searchMovie(search).then((result) => {
        setSearchMovies(result.results);
      });
    } else {
      setSearchMovies([]);
    }
  };

  const handleGenre = async (genreId: string | number) => {
    setSelectGenres(genreId);
    await getMovieByGenre(String(genreId))
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavorite = async () => {
    try {
      const data: string[] = await getUserFavorites(String(user.uid), dispatch);
      const favorite = data || [];

      const moviesData = await Promise.all(
        favorite.map(async (id: string) => {
          const movie = await getFilmById(id);
          return movie.data;
        })
      );
      dispatch(setFavorite(moviesData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoviePopular()
      .then((result) => {
        setPopulars(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    getMovieList()
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

    getMovieGenre()
      .then((result) => {
        setGenres(result.data.genres);
      })
      .catch((error) => {
        console.log(error);
      });
    getFavorite();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      handleSearch();
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parseUserData = JSON.parse(userData);
        dispatch(setUser(parseUserData));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  return (
    <>
      <Navbar user={user} />
      <SearchHero
        search={search}
        setSearch={setSearch}
        setSearchMovies={setSearchMovies}
      />
      <CarsList movies={searchMovies} />
      <Suspense fallback={<CardListSkeleton title={"Populer"} />}>
        <CardListCarousel datas={populars} title={"Populer"} />
      </Suspense>

      <GenreList
        genres={genres}
        selectGenres={selectGenres}
        handleGenre={handleGenre}
      />
      <CarsList movies={movies} title={"Movies"} />
      <Footer />
      <WaterMark />
    </>
  );
};

export default Home;
