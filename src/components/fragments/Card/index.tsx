import { Link } from "react-router-dom";

interface MovieTypes {
  id: number;
  poster_path: string;
  title: string;
}

type CardProps = {
  movie: MovieTypes;
};

const Card = ({ movie }: CardProps) => {
  const { id, title, poster_path } = movie;
  return (
    <Link
      to={`/detail/${id}`}
      className="p-2 hover:cursor-pointer group"
      key={id}
    >
      <div className="p-2 h-full rounded">
        <img
          src={`${import.meta.env.VITE_APP_BASEIMGURL}/${poster_path}`}
          className="rounded shadow-lg transition duration-500 group-hover:shadow-2xl group-hover:scale-110"
          alt={title}
        />

        <h1 className="mt-4 font-medium">{title}</h1>
      </div>
    </Link>
  );
};

export default Card;
