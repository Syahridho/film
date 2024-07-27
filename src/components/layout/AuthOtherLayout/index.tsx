import { FaGoogle } from "react-icons/fa6";

const AuthOtherLayout = () => {
  return (
    <div>
      <div className="p-2 font-medium flex justify-center items-center gap-4 border-2 border-slate-800 rounded transition duration-500 hover:cursor-pointer hover:bg-slate-200 ">
        <FaGoogle />
        Masuk dengan Google
      </div>
    </div>
  );
};

export default AuthOtherLayout;
