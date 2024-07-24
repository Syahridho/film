import { Link } from "react-router-dom";

const Card = (props: any) => {
  const { movie } = props;
  return (
    <Link
      to={`/detail/${movie.id}`}
      className="p-2 hover:cursor-pointer "
      key={movie.id}
    >
      <div className="p-2 h-[90%] rounded transition duration-300  hover:bg-slate-200 ">
        <img
          src={`${import.meta.env.VITE_APP_BASEIMGURL}/${movie.poster_path}`}
          className="rounded shadow-lg"
          alt={movie.title}
        />
        <h1 className="mt-4">{movie.title}</h1>
      </div>
    </Link>
  );
};

export default Card;
