import style from "../../style";
import { icons } from "../../constants";
import { Link } from "react-router-dom";

const GameHistory = () => {
  return (
    <div
      className={`h-max flex flex-col p-5 px-6 bg-opacity-30 shadow-2xl 
    ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}
    >
      {/* head ***/}
      <div className={`flex w-full text-bLight_4 py-1`}>
        <span className="">Games history</span>
        <Link
          to="/games"
          className={`ml-auto text-3xl font-bold hover:text-bLight_2 transition-colors`}
        >
          {<icons.toRight />}
        </Link>
      </div>
      <div
        className={`w-full flex flex-row text-bLight_4 font-bold bg-bDark_4 p-1 px-4 mt-2 rounded-full`}
      >
        <span>Versus</span>
        <span className="mx-auto">Result</span>
        <span>Date/Time</span>
      </div>
    </div>
  );
};

export default GameHistory;
