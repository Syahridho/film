import { Link } from "react-router-dom";

const Card = (props: any) => {
  const { movie } = props;
  return (
    <Link
      to={`/detail/${movie.id}`}
      className="p-2 hover:cursor-pointer group"
      key={movie.id}
    >
      <div className="p-2 h-full rounded">
        <img
          src={`${import.meta.env.VITE_APP_BASEIMGURL}/${movie.poster_path}`}
          className="rounded shadow-lg transition duration-500 group-hover:shadow-2xl group-hover:scale-110"
          alt={movie.title}
        />

        <h1 className="mt-4 font-medium">{movie.title}</h1>
      </div>
    </Link>
  );
};

export default Card;
