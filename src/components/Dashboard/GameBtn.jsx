import style from "../../style";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { icons } from "../../constants";

const GameBtn = () => {
  return (
    <div className="flex flex-col w-5/12 h-max">
      <Link
        to={"/games"}
        className="w-full flex flex-row bg-gradient-to-r from-org_2 to-white p-4"
      >
        <div className="w-2/6 flex flex-col items-center text-center">
          <img src="/src/assets/rocket.png" alt="rocket" className="w-full" />
        </div>
        <div className="text-[80pt] w-4/6 flex flex-col items-center text-shadow">
            {<icons.friends className="w-full text-white" />}
        </div>
      </Link>
    </div>
  );
};

export default GameBtn;
