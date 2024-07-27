type PropstTypes = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

const Button = (props: PropstTypes) => {
  const { children, type, onClick } = props;

  return (
    <button
      type={type}
      className="bg-slate-800 text-white w-full py-1.5 rounded shadow-xl border border-slate-800 mt-2 transition duration-500 hover:bg-slate-950"
      onClick={() => onClick}
    >
      {children}
    </button>
  );
};

export default Button;
