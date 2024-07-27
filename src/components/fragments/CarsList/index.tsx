import Card from "../Card";

const CarsList = (props: any) => {
  const { movies, title } = props;
  return (
    <div>
      <h1 className="ps-2 text-3xl font-semibold">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-1">
        {movies.length > 0
          ? movies.map((movie: any, index: any) => (
              <Card movie={movie} key={index} />
            ))
          : null}
      </div>
    </div>
  );
};

export default CarsList;
