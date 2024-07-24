import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailMovie } from "../../services/api";
import roundToOneDecimal from "../../utils/oneDecimal";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();

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
        <div className="relative">
          <div
            style={{
              backgroundImage: `url('${import.meta.env.VITE_APP_BASEIMGURL}/${
                movie.backdrop_path
              }')`,
            }}
            className={`absolute inset-0 bg-cover bg-center w-full blur-sm`}
          ></div>
          <div className="relative z-10 min-h-screen min-w-screen flex justify-center items-center">
            <div className="w-3/5 h-3/5 flex gap-8 bg-slate-200 rounded px-8 py-8">
              <img
                src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                  movie.poster_path
                }`}
                alt=""
                className="w-56 rounded"
              />
              <div className={"relative"}>
                <Link to="/" className="absolute right-0 top-0 underline">
                  Back
                </Link>

                <h1 className={"font-bold text-3xl mb-4"}>{movie.title}</h1>
                <h2 className="mb-4">{movie.overview}</h2>
                <h5>
                  Rating{" "}
                  <span className="text-yellow-600">
                    {roundToOneDecimal(movie.vote_average)}
                  </span>
                  /10
                </h5>
                <div className="flex gap-1 my-2">
                  {movie.genres.map((genre: any) => (
                    <span
                      key={genre.id}
                      className="px-2 py-1 text-xs rounded-full border bg-slate-100 text-slate-700 shadow-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
