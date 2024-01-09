import { Link } from "react-router-dom";

const Error_404 = () => {
  return (
    <div className={`flex w-full h-full`}>
      <div className={`flex flex-col w-max h-max gap-6 items-center m-auto `}>
        <p className={`text-9xl text-org_3 font-bold`}>404</p>
        <p className={`text-2xl text-bLight_4 font-bold`}>Page not found</p>
        <Link to="/"
          className={`text-2xl p-4 mt-20 rounded-2xl bg-bLight_5 text-bDark_4 w-full text-center font-bold`}
        >Go Home</Link>
      </div>
    </div>
  );
};

export default Error_404;
