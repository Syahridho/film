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
import Info from "../../components/element/Info";
import SearchHero from "../../components/fragments/SearchHero";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite, setUser } from "../../store/action";
import { getUserFavorites } from "../../services/firebase/services";

const CardListCarousel = React.lazy(
  () => import("../../components/fragments/CardListCarousel")
);

const Home = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [movies, setMovies] = useState<any>([]);
  const [searchMovies, setSearchMovies] = useState<any>([]);
  const [populars, setPopulars] = useState<any>([]);
  const [selectGenres, setSelectGenres] = useState<any>(null);
  const [genres, setGenres] = useState<any>([]);
  const [search, setSearch] = useState<any>("");

  const handleSearch = async () => {
    if (search.length > 3) {
      await searchMovie(search).then((result) => {
        setSearchMovies(result.results);
      });
    } else {
      setSearchMovies([]);
    }
  };

  const handleGenre = async (genreId: string) => {
    setSelectGenres(genreId);
    await getMovieByGenre(genreId)
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFavorite = async () => {
    const data: any = await getUserFavorites(user.uid, dispatch);
    const favorite = data || [];

    const moviesData = await Promise.all(
      favorite.map(async (id: string) => {
        const movie = await getFilmById(id);
        return movie.data;
      })
    );
    console.log(moviesData);
    dispatch(setFavorite(moviesData));
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
      <Info
        title="Perhatian"
        subTitle="Website ini sedang tahap pengerjaan jadi mohon maaf kalo ada bug atau
        kesalahan lainnya."
      />
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
