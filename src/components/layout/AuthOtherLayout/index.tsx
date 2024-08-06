type PropsTypes = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

const AuthOtherLayout = (props: PropsTypes) => {
  const { children, className, onClick } = props;
  return (
    <button
      className={`p-2 w-full font-medium flex justify-center items-center gap-4 border-2 border-slate-800 rounded transition duration-500 hover:cursor-pointer hover:bg-slate-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AuthOtherLayout;
