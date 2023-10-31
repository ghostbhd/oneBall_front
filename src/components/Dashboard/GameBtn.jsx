import style from "../../style";
import { Link } from "react-router-dom";
import { icons } from "../../constants";

const GameBtn = () => {
  return (
    <div className={`flex flex-col h-max space-y-14 ${style.boxWidth}`}>
      <Link
        to={"/games"}
        className={`w-full h-50 flex flex-row bg-gradient-to-r shadow-4xl shadow-org_1 from-org_2 to-white p-4 ${style.rounded}`}
      >
        <div className="w-2/6 flex flex-col items-center text-center">
          <img src="/src/assets/rocket.png" alt="rocket" className="w-full -translate-x-6 -translate-y-14" />
          <p className="text-3xl -translate-y-6 font-bold text-white">Play with friend</p>
        </div>
        <div className="text-[80pt] w-4/6 flex flex-col items-center text-shadow">
            {<icons.friends className="w-full text-org_3 m-auto" />}
        </div>
      </Link>

      <Link
        to={"/games"}
        className={`w-full h-50 flex flex-row bg-gradient-to-r shadow-4xl shadow-bLight_3 from-bLight_5 to-white p-4 ${style.rounded}`}
      >
        <div className="w-2/6 flex flex-col items-center text-center">
          <img src="/src/assets/rocket.png" alt="rocket" className="w-full -translate-x-6 -translate-y-14" />
          <p className="text-3xl -translate-y-6 font-bold text-white">Play random</p>
        </div>
        <div className="text-[80pt] w-4/6 flex flex-col items-center text-shadow">
            {<icons.random className="w-full text-bDark_1 m-auto" />}
        </div>
      </Link>
    </div>
  );
};

export default GameBtn;
