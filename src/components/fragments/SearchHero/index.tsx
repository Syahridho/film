import { FaXmark } from "react-icons/fa6";

const SearchHero = (props: any) => {
  const { search, setSearch, setSearchMovies } = props;
  return (
    <div className="container max-w-[1000px] mx-auto px-4 xl:px-0">
      <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
        <h1 className="text-2xl font-semibold mb-6 md:text-3xl">
          Cari film untuk hari ini
        </h1>
        <div className="relative w-10/12 md:w-8/12">
          <input
            type="text"
            className="border w-full  px-4 rounded-full h-10 shadow"
            placeholder="Film"
            name="search"
            id="search"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
          <button
            className={` right-0 p-3 rounded-full ${
              search ? "absolute" : "hidden"
            }`}
            onClick={() => {
              setSearch("");
              setSearchMovies([]);
            }}
          >
            <FaXmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
