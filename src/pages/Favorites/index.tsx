import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/fragments/Card";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const navigate = useNavigate();
  const movieFavorite = useSelector((state: any) => state.favorite);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    setFavorites(movieFavorite);
    console.log(favorites);
  }, []);

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
          {favorites.length > 0
            ? favorites.map((favorite: any, index: any) => (
                <Card key={index} movie={favorite} />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Favorites;
