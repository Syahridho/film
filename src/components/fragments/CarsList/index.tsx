import { MovieTypes } from "@/types/global";
import Card from "../Card";

interface PropTypes {
  movies: [];
  title: string;
}

const CarsList = (props: PropTypes) => {
  const { movies, title } = props;
  return (
    <div className="container mx-auto max-w-[1000px] px-4 xl:px-0">
      <h1 className="ps-2 text-3xl font-semibold">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 md:gap-1">
        {movies.length > 0
          ? movies.map((movie: MovieTypes, index: number) => (
              <Card key={index} movie={movie} />
            ))
          : null}
      </div>
    </div>
  );
};

export default CarsList;
