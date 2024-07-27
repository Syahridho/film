import { Link } from "react-router-dom";

type PropsTypes = {
  to: string;
  title: string;
  linkTitle: string;
  or?: boolean;
};

const AuthPrompt = (props: PropsTypes) => {
  const { to, title, linkTitle, or = true } = props;
  return (
    <div>
      <h1 className="text-center my-4">
        {title}{" "}
        <Link to={to} className="text-blue-900 underline">
          {linkTitle}
        </Link>
      </h1>
      {or ? (
        <div className="flex justify-center items-center gap-4 my-6">
          <hr className="flex-1 border-t border-gray-400" />
          <span>atau</span>
          <hr className="flex-1 border-t border-gray-400" />
        </div>
      ) : null}
    </div>
  );
};

export default AuthPrompt;
