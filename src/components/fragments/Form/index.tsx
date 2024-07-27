type PropsTypes = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = (props: PropsTypes) => {
  const { children, onSubmit } = props;
  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
