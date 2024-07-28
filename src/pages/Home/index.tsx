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
import { Link } from "react-router-dom";
import Footer from "../../components/layout/FooterLayout";
import WaterMark from "../../components/element/WaterMark";
import ButtonGenre from "../../components/element/ButtonGenre";
import GenreList from "../../components/fragments/GenreList";

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
      <div className="container max-w-[1000px] mx-auto">
        <div className="px-4 xl:px-0">
          <div className="w-full flex justify-between pt-8">
            <h1 className="ps-2 text-3xl font-bold text-slate-800">
              Movie Sas
            </h1>
            <div className="flex gap-2">
              <Link
                to={"/signup"}
                className="bg-white text-slate-800 px-4 py-1 border border-slate-800 rounded shadow transition duration-500 hover:bg-slate-800 hover:text-white hidden sm:block"
              >
                Daftar
              </Link>
              <Link
                to={"/login"}
                className="bg-slate-800 text-white px-4 py-1 border border-slate-800 rounded shadow transition duration-500 hover:bg-white hover:text-slate-800"
              >
                Masuk
              </Link>
            </div>
          </div>
          <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-semibold mb-6 md:text-3xl">
              Cari film untuk hari ini
            </h1>
            <div className="relative w-10/12 md:w-8/12">
              <input
                type="text"
                className="border w-full  px-4 rounded-full h-10 shadow"
                placeholder="Film"
                name="search"
                id="search"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
              <button
                className={` right-0 p-3 rounded-full ${
                  search ? "absolute" : "hidden"
                }`}
                onClick={() => {
                  setSearch("");
                  setSearchMovies([]);
                }}
              >
                <FaXmark />
              </button>
            </div>
          </div>
          <CarsList movies={searchMovies} />
          <Suspense fallback={<CardListSkeleton title={"Populer"} />}>
            <CardListCarousel movies={populars} title={"Populer"} />
          </Suspense>

          <div className="bg-slate-200 text-slate-800 p-12 mb-24 md:rounded-xl">
            <h1 className="text-xl font-semibold leading-10">Tentang Kami</h1>
            <p>
              Website ini sedang tahap pengerjaan jadi mohon maaf kalo ada bug
              atau kesalahan lainnya.
            </p>
          </div>
          <GenreList
            genres={genres}
            selectGenres={selectGenres}
            handleGenre={handleGenre}
          />

          <CarsList movies={movies} title={"Movies"} />
        </div>
        <Footer />
      </div>
      <WaterMark />
    </>
  );
};

export default Home;
