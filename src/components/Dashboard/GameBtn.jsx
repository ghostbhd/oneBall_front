import style from "../../style";
import { Link } from "react-router-dom";
import { icons } from "../../constants";

const GameBtn = () => {
  const linkStyle = "w-full h-50 p-4 flex flex-row bg-gradient-to-r shadow-4xl " + style.rounded;
  const divContainerStyle =
    "md:w-2/6 w-3/6 flex flex-col items-center text-center";
  const pStyle = "md:text-3xl text-2xl -translate-y-6 font-bold text-white";
  const imgStyle = "w-full -translate-x-6 -translate-y-14";
  const iconContainerStyle = "text-[80pt] md:w-4/6 w-3/6 flex items-center";

  return (
    <div className={`flex flex-col h-max space-y-14 ${style.boxWidth}`}>
      {/* First button --------------------------------------------- */}
      <Link
        to={"/games"}
        className={`${linkStyle} shadow-org_1 from-org_2 to-white`}
      >
        <div className={`${divContainerStyle}`}>
          {/* Rocket image -------------- */}
          <img
            src="/src/assets/rocket.png"
            alt="rocket"
            className={`${imgStyle}`}
          />
          {/* Play with friend text -------------- */}
          <p className={`${pStyle}`}>Play with friend</p>
        </div>
        {/* Friends icon -------------- */}
        <div className={`${iconContainerStyle}`}>
          {<icons.friends className="w-full text-org_3 m-auto" />}
        </div>
      </Link>

      {/* Second button ---------------------------------------- */}
      <Link
        to={"/games"}
        className={`${linkStyle} shadow-bLight_3 from-bLight_5 to-white`}
      >
        <div className={`${divContainerStyle}`}>
          {/* Rocket image ------------- */}
          <img
            src="/src/assets/rocket.png"
            alt="rocket"
            className={`${imgStyle}`}
          />
          {/* Play with random text ------------- */}
          <p className={`${pStyle}`}>Play with random</p>
        </div>
        {/* Random icon ------------- */}
        <div className={`${iconContainerStyle}`}>
          {<icons.random className="w-full text-bDark_1 m-auto" />}
        </div>
      </Link>
    </div>
  );
};

export default GameBtn;
