import "react-multi-carousel/lib/styles.css";
import {
  getMovieList,
  searchMovie,
  getMoviePopular,
} from "./../../services/api";
import React, { Suspense, useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import CardListSkeleton from "../../components/fragments/CardListSkeleton";
import CarsList from "../../components/fragments/CarsList";
import { Link } from "react-router-dom";

const CardListCarousel = React.lazy(
  () => import("../../components/fragments/CardListCarousel")
);

const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const [searchMovies, setSearchMovies] = useState<any>([]);
  const [populars, setPopulars] = useState<any>([]);

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

          <CarsList movies={movies} title={"Movies"} />
        </div>

        <div className="bg-slate-100 mt-12 px-8 py-12 xl:mb-12 xl:px-0 md:py-16 md:border-t md:border-slate-200 md:bg-[#fafafa]">
          <div className="grid grid-cols-12 gap-12 ">
            <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
              <h1 className="font-semibold text-3xl">Movie Sas</h1>
              <h3>syahridhosyahputra@gmail.com</h3>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col gap-2">
              <h1 className="font-semibold">Movie Sas</h1>
              <Link to="/login" className="underline">
                Log In
              </Link>
              <Link to="/signup" className="underline">
                Sign Up
              </Link>
              <Link to="forgot" className="underline">
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-2 bg-slate-800 text-white text-sm shadow">
        <h1>@2024 Syahridho Arjuna Syahputra</h1>
      </div>
    </>
  );
};

export default Home;
