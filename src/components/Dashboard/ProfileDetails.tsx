import PropTypes from "prop-types";
import style from "../../style";
import { Link } from "react-router-dom";
import { ImgBg } from "../../style";

const ProfileDetails = ({ user }) => {
  const pStyle = "text-bLight_2 text-[26pt] w-3/12 text-center leading-[.8em]";
  const spanStyle = "block text-bLight_5 text-[12pt]";

  return (
    <div className={`flex flex-col relative w-11/12 h-max ${style.boxWidth}`}>
      {/* details --------------------------------------------------------------------------------*/}
      <div
        className={`md:w-10/12 w-full flex flex-col h-max p-4 pl-7 left-0 ${style.blueBlur} ${style.rounded}`}
      >
        {/* FullName and userName -------------------------------------*/}
        <p className="sm:w-8/12 w-full text-bLight_3 text-2xl text-center">
          {user.fullName}
          <span className={`block text-lg text-bLight_4`}>@{user.username}</span>
        </p>
        {/* level, games, win, lose  ----------------*/}
        <div className={`sm:w-8/12 w-full sm:p-8 p-2 flex flex-col space-y-4`}>
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
        {/* link view more to /games */}
        <div className="sm:w-8/12 w-full text-center justify-center">
          <Link
            to={"/stats"}
            className="w-max text-base transition-colors duration-300 
              text-bLight_5 hover:text-bLight_2 mt-5"
          >
            view more
          </Link>
        </div>
      </div>
      {/* image ---------------------------*/}
      <div
        title="profile image"
        className={`sm:block hidden absolute md:w-52 w-36 md:h-[90%] h-full right-0 ${
          style.rounded
        }
          top-[50%] transform translate-y-[-50%] md:border-[7px] border-4 md:shadow-3xl shadow-none
        ${
          user.status === "online"
            ? style.online
            : user.status === "offline"
            ? style.offline
            : style.inGame
        }`}
        style={ImgBg({ img: user.image })}
      ></div>
    </div>
  );
};

ProfileDetails.propTypes = {
  user: PropTypes.object.isRequired,
};

export default ProfileDetails;
