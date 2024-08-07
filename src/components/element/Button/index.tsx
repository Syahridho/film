type PropstTypes = {
  children: React.ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const Button = (props: PropstTypes) => {
  const { children, type, onClick, disabled = false } = props;

  return (
    <button
      type={type}
      className="bg-slate-800 text-white w-full py-1.5 rounded shadow-xl border border-slate-800 mt-2 transition duration-500 hover:bg-slate-950"
      onClick={() => onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
