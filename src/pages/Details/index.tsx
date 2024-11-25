import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getActorMovie,
  getDetailMovie,
  getTrailerMovie,
} from "../../services/api";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} from "../../services/firebase/services";
import roundToOneDecimal from "../../utils/oneDecimal";
import { FaHeart } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import HeroVideoDialog from "../../components/ui/hero-video-dialog";
import { AppState, Genre } from "@/types/global";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  genres: Genre[];
}

interface Actor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Trailer {
  id: string;
  key: string;
  name: string;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorite = useSelector((state: AppState) => state.favorite);
  const user = useSelector((state: AppState) => state.user);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [love, setLove] = useState<boolean>(false);
  const [actors, setActors] = useState<Actor[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loadingActors, setLoadingActors] = useState<boolean>(false);
  const [showAllActors, setShowAllActors] = useState<boolean>(false);

  const toggleFavorite = async () => {
    if (!user?.uid) return;
    if (love) {
      await removeFavorite(id!, user.uid);
    } else {
      await addFavorite(id!, user.uid);
    }
    await getUserFavorites(user.uid, dispatch);
    setLove(!love);
  };

  useEffect(() => {
    if (!id) return;

    // Fetch movie details
    getDetailMovie(id)
      .then((result) => setMovie(result.data))
      .catch((error) => console.error("Error fetching movie details:", error));

    // Fetch actors
    setLoadingActors(true);
    getActorMovie(id)
      .then((result) => {
        setActors(result.data.cast || []);
        setLoadingActors(false);
      })
      .catch((error) => {
        console.error("Error fetching actors:", error);
        setLoadingActors(false);
      });

    // Fetch trailers
    getTrailerMovie(id)
      .then((result) => setTrailers(result.data.results || []))
      .catch((error) => console.error("Error fetching trailers:", error));

    // Check if movie is in favorites
    if (favorite) {
      setLove(favorite.some((item) => item.id === Number(id)));
    }
  }, [id, favorite]);

  const displayedActors = useMemo(
    () => (showAllActors ? actors : actors.slice(0, 7)),
    [actors, showAllActors]
  );

  return (
    <>
      {movie && (
        <div className="relative bg-[#fafafa]">
          <button
            onClick={() => navigate(-1)}
            className="absolute z-50 p-3 top-4 left-4 bg-white rounded-full border-2 border-slate-500"
          >
            <FaArrowLeft />
          </button>
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
              alt={movie.title}
              className="absolute rounded-md shadow-2xl left-1/3 top-32 w-1/3 xl:static xl:w-60"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2 mt-24 xl:mt-0">
                {movie.title}
              </h1>
              <h2 className="text-base text-slate-600 text-justify">
                {movie.overview}
              </h2>
              <button
                className={`p-2 border-2 rounded-full mb-4 mt-2 ${
                  love ? "text-red-500" : "text-slate-300"
                }`}
                onClick={toggleFavorite}
              >
                <FaHeart />
              </button>
              <p className="mb-4">
                Rating{" "}
                <span className="text-yellow-500 font-medium">
                  {movie.vote_average > 1
                    ? roundToOneDecimal(movie?.vote_average)
                    : null}
                </span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {movie.genres
                  ? movie?.genres.map((genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className="border text-sx text-slate-500 px-2 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container max-w-[1000px] mx-auto px-4 py-12">
        <h1 className="ps-2 text-3xl font-semibold mb-12">Trailers</h1>
        <div className="flex gap-4 overflow-x-auto no-scroll">
          {trailers.map(
            (trailer: { id: string; key: string; name: string }) => (
              <HeroVideoDialog
                key={trailer.id}
                className="w-[300px] h-full flex-shrink-0"
                animationStyle="from-center"
                videoSrc={`https://www.youtube.com/embed/${trailer.key}`}
                thumbnailSrc={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                thumbnailAlt={trailer.name}
              />
            )
          )}
        </div>
      </div>

      <div className="container max-w-[1000px] mx-auto px-4 py-12">
        <h1 className="ps-2 text-3xl font-semibold mb-12">Actors</h1>
        {loadingActors ? (
          <p>Loading actors...</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
            {displayedActors.map((actor) => (
              <div key={actor.id} className="border rounded shadow">
                {actor.profile_path ? (
                  <img
                    src={`${import.meta.env.VITE_APP_BASEIMGURL}/${
                      actor.profile_path
                    }`}
                    alt={actor.name}
                    loading="lazy"
                    className="w-full bg-cover"
                  />
                ) : (
                  <div className="bg-gray-500 h-44"></div>
                )}
                <div className="p-2">
                  <h1>{actor.name}</h1>
                  <h2 className="text-slate-500 text-xs">{actor.character}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center items-center gap-4 my-6">
          <hr className="flex-1 border-t border-gray-400" />
          <button
            onClick={() => setShowAllActors(!showAllActors)}
            className="border text-sm rounded-full px-12 py-1 text-slate-500 hover:bg-slate-100"
          >
            {showAllActors ? "Show Less" : "Show All"}
          </button>
          <hr className="flex-1 border-t border-gray-400" />
        </div>
      </div>
    </>
  );
};

export default Details;
