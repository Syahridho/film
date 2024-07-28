type PropsTypes = {
  title: string;
  subTitle: string;
};

const Info = (props: PropsTypes) => {
  const { title, subTitle } = props;
  return (
    <div className="container max-w-[1000px] mx-auto bg-slate-200 text-slate-800 p-12 mb-24 md:rounded-xl">
      <h1 className="text-xl font-semibold leading-10">{title}</h1>
      <p>{subTitle}</p>
    </div>
  );
};

export default Info;
