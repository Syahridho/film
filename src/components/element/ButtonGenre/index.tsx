type PropsTypes = {
  className?: string;
  type?: "button" | "reset" | "submit";
  children: React.ReactNode;
  onClick?: () => void;
};

const ButtonGenre = (props: PropsTypes) => {
  const { className, type = "button", onClick, children } = props;
  return (
    <button
      className={`border text-sm text-slate-500 py-1 px-2 rounded-full text-nowrap hover:bg-slate-200 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonGenre;
