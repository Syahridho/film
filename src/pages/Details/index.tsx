import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getActorMovie,
  getDetailMovie,
  getTrailerMovie,
} from "../../services/api";
import roundToOneDecimal from "../../utils/oneDecimal";
import { FaArrowLeft } from "react-icons/fa6";
import Carousel from "react-multi-carousel";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>();

  const [statusActor, setStatusActor] = useState<any>(false);
  const [actors, setActors] = useState<any>([]);
  const [allActors, setAllActors] = useState<any>([]);

  const [trailers, setTrailers] = useState<any>([]);

  const [loading, setLoading] = useState<any>({});

  const handleImageLoad = (id: string) => {
    setLoading((prevState: any) => ({ ...prevState, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setLoading((prevState: any) => ({ ...prevState, [id]: false }));
  };
  console.log(trailers);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    if (id) {
      getDetailMovie(id)
        .then((result) => {
          setMovie(result.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getActorMovie(id)
        .then((result) => {
          const allActorsData = result.data.cast || [];
          setActors(allActorsData.slice(0, 7));
          setAllActors(allActorsData);
        })
        .catch((error) => {
          console.log(error);
        });

      getTrailerMovie(id)
        .then((result) => {
          setTrailers(result.data.results);
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
      <div className="container max-w-[1000px] mx-auto px-4 py-12">
        <h1 className="ps-2 text-3xl font-semibold mb-12">Trailers</h1>
        <Carousel responsive={responsive}>
          {trailers
            ? trailers.map((trailer: any, index: any) => (
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  className="rounded mx-2"
                  allow="clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={trailer.name}
                ></iframe>
              ))
            : null}
        </Carousel>
      </div>
      <div className="container max-w-[1000px] mx-auto px-4 py-12">
        <h1 className="ps-2 text-3xl font-semibold mb-12">Actor</h1>
        <div className="grid grid-cols-3 md:grid-cols-7 mx-auto gap-3 flex-nowrap">
          {statusActor
            ? allActors.length > 0
              ? allActors.map((actor: any) => (
                  <div
                    key={actor.id}
                    className="border rounded shadow overflow-hidden "
                  >
                    {loading[actor.id] ? (
                      <div className="bg-gray-300 animate-pulse"></div>
                    ) : actor.profile_path ? (
                      <img
                        src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                          actor.profile_path
                        }`}
                        alt={actor.name}
                        className="w-40 bg-cover"
                        onLoad={() => handleImageLoad(actor.id)}
                        onError={() => handleImageError(actor.id)}
                      />
                    ) : (
                      <div className="bg-red-500 h-44"></div>
                    )}
                    <div className="p-2">
                      <h1 className="">{actor.name}</h1>
                      <h1 className=" text-slate-500 text-xs">
                        {actor.character}
                      </h1>
                    </div>
                  </div>
                ))
              : null
            : actors.length > 0
            ? actors.map((actor: any) => (
                <div
                  key={actor.id}
                  className="border rounded shadow overflow-hidden "
                >
                  {loading[actor.id] ? (
                    <div className="bg-gray-300 animate-pulse"></div>
                  ) : actor.profile_path ? (
                    <img
                      src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                        actor.profile_path
                      }`}
                      alt={actor.name}
                      className="w-40 bg-cover"
                      onLoad={() => handleImageLoad(actor.id)}
                      onError={() => handleImageError(actor.id)}
                    />
                  ) : (
                    <div className="bg-red-500 h-44"></div>
                  )}
                  <div className="p-2">
                    <h1 className="">{actor.name}</h1>
                    <h1 className=" text-slate-500 text-xs">
                      {actor.character}
                    </h1>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div>
          <div className="flex justify-center items-center gap-4 my-6">
            <hr className="flex-1 border-t border-gray-400" />
            <button
              className="border text-sm rounded-full px-12 py-1 text-slate-500 hover:bg-slate-100 "
              onClick={() => setStatusActor(!statusActor)}
            >
              {statusActor ? "Sedikitkan" : "Lihat Semua"}
            </button>
            <hr className="flex-1 border-t border-gray-400" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
