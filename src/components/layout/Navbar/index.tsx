import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container max-w-[1000px] mx-auto px-4 xl:px-0 w-full flex justify-between pt-8">
      <h1 className="ps-2 text-3xl font-bold text-slate-800">Movie Sas</h1>
      <div className="flex gap-2">
        <Link
          to={"/signup"}
          className="bg-white text-slate-800 px-4 py-1 border border-slate-800 rounded shadow transition duration-500 hover:bg-slate-800 hover:text-white hidden sm:block"
        >
          Daftar
        </Link>
        <Link
          to={"/login"}
          className="bg-slate-800 text-white px-4 py-1 border border-slate-800 rounded shadow transition duration-500 hover:bg-white hover:text-slate-800"
        >
          Masuk
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
