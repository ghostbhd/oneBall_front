import PropTypes from "prop-types";
import style from "../../style";
import { Link } from "react-router-dom";

const ProfileDetails = ({ user }) => {
  const imagebg = {
    backgroundImage: `url('${user.image}')`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
  };

  const pStyle = "text-blue_light_2 text-4xl w-max text-center";
  const spanStyle = "block text-blue_light_4 text-base";

  return (
    <div className="flex flex-col relative w-6/12 ml-auto h-max">
      {/* details --------------------------------------------------------------------------------*/}
      <div
        className={`w-9/12 flex flex-col h-max p-4 pl-7 left-0 ${style.blueBlur} ${style.rounded}`}
      >
        {/* FullName and userName -------------------------------------*/}
        <p className="w-8/12 text-blue_light_3 text-2xl text-center">
          {user.fullName}
          <span className={`block text-lg text-blue_light_4`}>
            {user.username}
          </span>
        </p>
        {/* level, games, win, lose  ----------------*/}
        <div className={`w-8/12 p-8 flex flex-col`}>
          <div className="w-full flex mb-2">
            <p className={pStyle}>
              {user.level} <span className={`${spanStyle}`}>Level</span>
            </p>
            <p className={`${pStyle} ml-auto`}>
              {user.games} <span className={`${spanStyle}`}>Games</span>
            </p>
          </div>
          <div className="w-full flex">
            <p className={`${pStyle}`}>
              {user.win} <span className={`${spanStyle}`}>Win</span>
            </p>
            <p className={`${pStyle} ml-auto`}>
              {user.lose} <span className={`${spanStyle}`}>Lose</span>
            </p>
          </div>
        </div>
        <Link
          to={"/games"}
          className="w-8/12 text-center text-lg text-orange_3 mt-5"
        >
          view more
        </Link>
      </div>
      {/* image ---------------------------*/}
      <div
        className={`absolute w-56 h-80 right-4 ${
          style.rounded
        } top-[50%] transform translate-y-[-50%] border-8
        ${
          user.status === "online"
            ? style.online
            : user.status === "offline"
            ? style.offline
            : style.inGame
        }`}
        style={imagebg}
      ></div>
    </div>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileDetails;
