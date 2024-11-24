import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

type PropstTypes = {
  label: string;
  type?: "text" | "password" | "number" | "email";
  name: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: PropstTypes) => {
  const [hidden, setHidden] = useState(false);
  const { label, type, name, value, onChange } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <input
          type={hidden ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className="border p-1 w-full rounded shadow-sm"
          required
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            className="absolute right-0 text-slate-500 p-2"
          >
            {hidden ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
