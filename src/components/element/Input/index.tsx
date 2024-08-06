type PropstTypes = {
  label: string;
  type?: "text" | "password" | "number" | "email";
  name: string;
  value?: string | number;
  onChange?: (event: any) => void;
};

const Input = (props: PropstTypes) => {
  const { label, type, name, value, onChange } = props;
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="border p-1 rounded shadow-sm"
        required
      />
    </div>
  );
};

export default Input;
