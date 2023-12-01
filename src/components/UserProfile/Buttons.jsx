import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import style from "../../style";
import { icons } from "../../constants";

const Buttons = ({ data }) => {
  return (
    <div
      className={`w-full flex flex-col px-5 bg-bLight_1/20 p-4 ${style.rounded}`}
    >
      {/* start game button ----------------------------------------- */}
      <Link
        to={"/game"}
        className={`w-full flex flex-row justify-center items-center p-3 
              rounded-xl bg-bLight_1/90`}
      >
        <p className={` ml-auto text-bDark_3 font-bold`}>Start a game</p>
        <div className={`text-3xl text-bDark_3 ml-auto`}>
          {<icons.gameController />}
        </div>
      </Link>

      
      <div className={`w-full mt-auto`}>
        {!data.friend && !data.friendRequest && !data.friendRequestSent ? (
          // Add friend button ---------------------------
          <div className={`flex p-3 rounded-xl bg-bDark_4 w-max items-center`}>
            <p className="text-bLight_3 text-sm font-bold">Add friend</p>
            <div className="text-xl ml-4 text-bLight_3">{<icons.add />}</div>
          </div>
        ) : (
          <div>fff</div>
        )}

        <div></div>
      </div>
    </div>
  );
};

Buttons.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Buttons;
