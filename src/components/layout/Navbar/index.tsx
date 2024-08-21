import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../../services/firebase/services";
import { useDispatch } from "react-redux";

const Navbar = ({ user }: any) => {
  const [menu, setMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenu(false);
      }
    };

    if (menu) {
      document.addEventListener("mousedown", handleClickOutSide);
    } else {
      document.removeEventListener("mousedown", handleClickOutSide);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  });

  return (
    <div className="container max-w-[1000px] mx-auto px-4 xl:px-0 w-full flex justify-between items-center pt-8">
      <h1 className="ps-2 text-3xl font-bold text-slate-800">Movie Sas</h1>
      {user ? (
        <div className="relative flex items-center gap-4" ref={menuRef}>
          <h1>{user.displayName ? user.displayName : user.email}</h1>
          <button
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-400 shadow hover:shadow-2xl"
            onClick={() => setMenu(!menu)}
          >
            {user.photoURL ? (
              <img src={user.photoURL} alt="" />
            ) : (
              <div>
                <div className="flex flex-col justify-center items-center gap-1 z-50">
                  <div className="w-4 h-4 bg-gray-300 rounded-full mt-2"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            )}
          </button>
          {menu && (
            <div className="absolute border -left-2 top-14 rounded-md shadow text-slate-800 md:-left-8">
              <button
                className="border w-full px-6 text-sm py-1 hover:bg-slate-100"
                onClick={() => navigate("/favorites")}
              >
                Favorite
              </button>
              <button
                className="border w-full px-3 text-sm py-1 text-red-500 hover:bg-red-100"
                onClick={() => signOutUser(dispatch)}
              >
                SignOut
              </button>
            </div>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default Navbar;
