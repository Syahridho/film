import "react-multi-carousel/lib/styles.css";
import { getMovieList, searchMovie } from "./../../services/api";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Card from "../../components/fragments/Card";
import { FaXmark } from "react-icons/fa6";
import CardListSkeleton from "../../components/fragments/CardListSkeleton";

const CardList = React.lazy(
  () => import("../../components/fragments/CardList")
);

const Home = () => {
  const [movies, setMovies] = useState<any>([]);
  const [populars, setPopulars] = useState<any>([]);
  const inputRef = useRef<any>(null);

  const search = async (q: string) => {
    if (q.length > 3) {
      await searchMovie(q).then((result) => {
        setMovies(result.results);
      });
    } else {
      setMovies([]);
    }
  };

  const handleClear = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      search("");
    }
  };

  useEffect(() => {
    getMovieList()
      .then((result) => {
        setPopulars(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto ">
      <div className="h-[80vh] flex flex-col justify-center items-center gap-4">
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
            onChange={({ target }) => search(target.value)}
            ref={inputRef}
          />
          <button
            className="absolute right-0 p-3 rounded-full"
            onClick={handleClear}
          >
            <FaXmark />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-5 gap-1">
        {movies.length > 0
          ? movies.map((movie: any) => <Card movie={movie} />)
          : null}
      </div>
      <Suspense fallback={<CardListSkeleton title={"Populer"} />}>
        <CardList movies={populars} />
      </Suspense>
      <div className="bg-slate-200 text-neutral-950 p-12 mb-24 md:rounded-xl">
        <h1 className="text-xl font-semibold leading-10">Tentang Kami</h1>
        <p>
          Website ini sedang tahap pengerjaan jadi mohon maaf kalo ada bug atau
          kesalahan lainnya.
        </p>
      </div>
    </div>
  );
};

export default Home;
