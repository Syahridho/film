type PropsTypes = {
  children: React.ReactNode;
  title: string;
};

const AuthLayout = (props: PropsTypes) => {
  const { children, title } = props;
  return (
    <div className="container max-w-96 mx-auto mt-24 px-8">
      <h1 className="text-2xl font-bold text-center mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
