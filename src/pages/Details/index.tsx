import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailMovie } from "../../services/api";
import roundToOneDecimal from "../../utils/oneDecimal";
import { FaArrowLeft } from "react-icons/fa6";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();
  console.log(movie);

  useEffect(() => {
    if (id) {
      getDetailMovie(id)
        .then((result) => {
          setMovie(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <>
      {movie && (
        <div className="relative bg-[#fafafa]">
          <Link
            to={"/"}
            className="absolute z-50 p-3 top-4 left-4 bg-white rounded-full border-2 border-slate-500"
          >
            <FaArrowLeft />
          </Link>
          <div className="relative">
            <img
              src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                movie.backdrop_path
              }`}
              alt={movie.title}
              className="w-full xl:blur-sm xl:bg-cover xl:bg-center"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white from-1% xl:bg-none" />
          </div>
          <div className="p-4 xl:p-12 xl:absolute xl:z-50 xl:top-[20%] xl:left-[18%] xl:w-2/3 xl:flex xl:items-center xl:justify-center xl:gap-8 xl:bg-white xl:rounded xl:shadow-2xl">
            <img
              src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                movie.poster_path
              }`}
              alt=""
              className="absolute rounded-md shadow-2xl left-1/3 top-32 w-1/3 xl:static xl:w-60"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2 mt-24 xl:mt-0">
                {movie.title}
              </h1>
              <h2 className="text-base text-slate-600 text-justify mb-4">
                {movie.overview}
              </h2>
              <p className="mb-4">
                Rating{" "}
                <span className="text-yellow-500 font-medium">
                  {roundToOneDecimal(movie.vote_average)}
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {movie.genres.map((genre: any) => (
                  <span
                    key={genre.id}
                    className="border text-sx text-slate-500 px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-96"></div>
    </>
  );
};

export default Details;
