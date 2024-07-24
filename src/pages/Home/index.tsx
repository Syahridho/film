import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { getMovieList, searchMovie } from "./../../services/api";
import { useEffect, useState } from "react";
import CardList from "../../components/fragments/CardList";

const Home = () => {
  const [movies, setMovies] = useState<any>([]);

  const search = async (q: string) => {
    if (q.length > 3) {
      await searchMovie(q).then((result) => {
        setMovies(result.results);
      });
    }
  };

  useEffect(() => {
    getMovieList()
      .then((result) => {
        setMovies(result.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto ">
      <div className="flex justify-between py-6">
        <h1 className="font-bold text-xl">Film Palas</h1>
        <ul className="flex gap-10">
          <li className="hover:underline">
            <Link to={"new"}>Terbaru</Link>
          </li>
          <li className="hover:underline">
            <Link to={"best"}>Terpopuler</Link>
          </li>
          <li className="hover:underline">
            <Link to={"top"}>Tertop</Link>
          </li>
        </ul>
      </div>
      <div className="h-[80vh] flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl font-semibold mb-6">
          Cari film untuk hari ini
        </h1>
        <input
          type="text"
          className="border w-8/12 px-4 rounded-full h-10 shadow"
          placeholder="Film "
          onChange={({ target }) => search(target.value)}
        />
      </div>
      <CardList movies={movies} />
      <div className="bg-slate-200 text-neutral-950 p-12 mb-24 rounded-xl">
        <h1 className="text-xl font-semibold leading-10">Tentang Kami</h1>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium,
          aperiam explicabo quas facere itaque odio nisi id cum ut earum. Natus
          harum nobis voluptates ut tempore velit nisi labore modi.
        </p>
      </div>
    </div>
  );
};

export default Home;
