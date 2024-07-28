import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-slate-100 mt-12 px-8 py-12 xl:mb-12 xl:px-0 md:py-16 md:border-t md:border-slate-200 md:bg-[#fafafa]">
      <div className="grid grid-cols-12 gap-12 ">
        <div className="col-span-12 md:col-span-4 flex flex-col gap-1">
          <h1 className="font-semibold text-3xl">Movie Sas</h1>
          <h3>syahridhosyahputra@gmail.com</h3>
        </div>
        <div className="col-span-12 md:col-span-3 md:col-start-10 flex flex-col gap-2">
          <h1 className="font-semibold">Movie Sas</h1>
          <Link to="/login" className="underline">
            Log In
          </Link>
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
          <Link to="forgot" className="underline">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
