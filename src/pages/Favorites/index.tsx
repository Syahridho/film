import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/fragments/Card";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { getUserFavorites } from "../../services/firebase/services";
import { getFilmById } from "../../services/api";
import { setFavorite } from "../../store/action";
import { AppState, MovieTypes } from "@/types/global";

const Favorites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);
  const [favorites, setFavorites] = useState<MovieTypes[]>([]);

  const getFavorite = async () => {
    if (!user?.uid) return;

    const favoriteIds: string[] = await getUserFavorites(user.uid, dispatch);

    const moviesData = await Promise.all(
      favoriteIds.map(async (id) => {
        const movie = await getFilmById(id);
        return movie.data as MovieTypes;
      })
    );
    setFavorites(moviesData);
    dispatch(setFavorite(moviesData));
  };

  useEffect(() => {
    getFavorite();
  });

  return (
    <>
      <div className="flex items-center mb-8 bg-slate-100 p-4 shadow md:container md:mx-auto md:max-w-[1000px] md:bg-slate-50 md:shadow-none">
        <button
          onClick={() => navigate(-1)}
          className="border p-2 rounded-full"
        >
          <FaArrowLeft />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-semibold">
          Favorite
        </h1>
      </div>
      <div className="container p-4 mx-auto max-w-[1000px]">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
          {favorites.length > 0 ? (
            favorites.map((favorite: MovieTypes, index: number) => (
              <Card key={index} movie={favorite} />
            ))
          ) : (
            <h1 className="absolute left-1/2 -translate-x-1/2 text-slate-400">
              Tidak Ada Data
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
