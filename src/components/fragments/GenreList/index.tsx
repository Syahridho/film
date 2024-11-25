import ButtonGenre from "../../element/ButtonGenre";

type PropsTypes = {
  genres: [];
  handleGenre?: (id: number) => void;
  selectGenres: string | number;
};

const GenreList = (props: PropsTypes) => {
  const { genres, handleGenre, selectGenres } = props;
  return (
    <div className="container max-w-[1000px] mx-auto px-4 xl:px-0 flex gap-2 my-12 md:flex-wrap md:justify-center overflow-auto no-scroll">
      {genres.length > 0
        ? genres.map((genre: { id: number; name: string }) => (
            <ButtonGenre
              key={genre.id}
              className={
                selectGenres === genre.id ? "bg-slate-200" : "bg-[#f8f8f8]"
              }
              onClick={() => handleGenre?.(genre.id)}
            >
              {genre.name}
            </ButtonGenre>
          ))
        : null}
    </div>
  );
};

export default GenreList;
