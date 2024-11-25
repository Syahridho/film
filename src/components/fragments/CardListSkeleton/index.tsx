interface PropTypes {
  title: string;
}

const CardListSkeleton = (props: PropTypes) => {
  const { title } = props;
  return (
    <div className="container max-w-[1000px] mx-auto px-4 xl:px-0 my-0">
      <h1 className="ps-2 text-3xl font-semibold">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 animate-pulse my-12">
        <div>
          <div className="w-full bg-slate-400 h-72 rounded"></div>
          <div className="mt-2 w-2/3 bg-slate-400 h-4 rounded"></div>
        </div>
        <div>
          <div className="w-full bg-slate-400 h-72 rounded"></div>
          <div className="mt-2 w-2/3 bg-slate-400 h-4 rounded"></div>
        </div>
        <div>
          <div className="w-full bg-slate-400 h-72 rounded"></div>
          <div className="mt-2 w-2/3 bg-slate-400 h-4 rounded"></div>
        </div>
        <div>
          <div className="w-full bg-slate-400 h-72 rounded"></div>
          <div className="mt-2 w-2/3 bg-slate-400 h-4 rounded"></div>
        </div>
        <div>
          <div className="w-full bg-slate-400 h-72 rounded"></div>
          <div className="mt-2 w-2/3 bg-slate-400 h-4 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CardListSkeleton;
