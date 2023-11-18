import { icons } from "../../constants";
import { Link } from "react-router-dom";

const Buttons = () => {
  const container = "flex w-1/2";
  const button = `flex p-4 items-center w-11/12 justify-around rounded-3xl
  bg-gradient-to-r shadow-btn`;
  const icon = "text-5xl text-white";
  const text = "text-2xl";

  return (
    <div className={`flex flex-row w-full`}>
      {/* with friend button */}
      <div className={container}>
        <Link
          to={"/games"}
          className={` ${button} from-org_2 to-white shadow-org_1`}
        >
          <div className={icon}>{<icons.friends />}</div>
          <p className={`${text} text-org_3 font-bold`}>Play with friend</p>
        </Link>
      </div>
      {/* with random button */}
      <div className={container}>
      <Link
          to={"/games"}
          className={` ${button} ml-auto from-bLight_5 to-white shadow-bLight_3`}
        >
          <div className={icon}>{<icons.random />}</div>
          <p className={`${text} text-bDark_1 font-bold`}>Play with random</p>
        </Link>
      </div>
    </div>
  );
};

export default Buttons;
