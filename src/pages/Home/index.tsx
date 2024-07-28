import "react-multi-carousel/lib/styles.css";
import {
  getMovieList,
  searchMovie,
  getMoviePopular,
  getMovieGenre,
  getMovieByGenre,
} from "./../../services/api";
import React, { Suspense, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import CardListSkeleton from "../../components/fragments/CardListSkeleton";
import CarsList from "../../components/fragments/CarsList";
import Footer from "../../components/layout/FooterLayout";
import WaterMark from "../../components/element/WaterMark";
import GenreList from "../../components/fragments/GenreList";
import Navbar from "../../components/layout/Navbar";
import Info from "../../components/element/Info";
import SearchHero from "../../components/fragments/SearchHero";

const CardListCarousel = React.lazy(
  () => import("../../components/fragments/CardListCarousel")
);

const Home = () => {
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
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <>
      <Navbar />
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
