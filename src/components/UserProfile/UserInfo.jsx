import { ImgBg } from "../../style";
import style from "../../style";
import PropTypes from "prop-types";
import { icons } from "../../constants";
import Buttons from "./Buttons";

const UserInfo = ({ data }) => {
  const starPosition = "absolute -top-3 -right-5 w-12 h-12";

  return (
    <div
      className={`w-full h-max flex relative overflow-hidden bg-gradient-to-r 
      ${
        data.state === "Online"
          ? "from-org_3/30 to-org_1/20"
          : data.state === "InGame"
          ? "from-bLight_3/30 to-bLight_1/30"
          : "from-gray-500/30 to-gray-400/30"
      }
      ${style.rounded}`}
    >
      {/* content ----------------------------- */}
      <div className={`w-full p-4 h-max flex flex-row space-x-8`}>
        {/* avatar ------------------------------------------- */}
        <div className="flex flex-col space-y-2 items-center">
          <div
            style={ImgBg({ img: data.image })}
            className={`w-32 h-32 ${style.rounded} relative shadow-xl`}
          >
            {/* star icon -----------------------*/}
            {<icons.star className={`${starPosition} text-org_3/80`} />}
            {/* level -----------*/}
            <div className={`flex ${starPosition}`}>
              <p className={`text-sm w-max m-auto font-bold text-org_1`}>
                {data.level}.{data.xp / 100}
              </p>
            </div>
          </div>
          {/* xp and progress ------------------------ */}
          <div className="w-32 flex mt-auto flex-wrap items-center">
            {/* progress bar ---------------- */}
            <div className="w-11/12 flex h-2 bg-org_3/20 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-org_3  to-org_1 rounded-full"
                style={{ width: `${data.xp / 10}%` }}
              ></div>
            </div>
            {/* Next level ------------------------ */}
            <p className="w-1/12 ml-auto  text-sm text-right text-org_1">
              {data.level + 1}
            </p>
          </div>
        </div>

        {/* user info ------------------------------------------- */}
        <div className="flex flex-col h-32">
          <p
            className={`text-xl w-max ${
              data.state === "Online"
                ? "text-org_1/80"
                : data.state === "InGame"
                ? "text-bLight_3"
                : "text-gray-400"
            }`}
          >
            {data.fullName}
          </p>
          <p
            className={`${
              data.state === "Online"
                ? "text-org_1/60"
                : data.state === "InGame"
                ? "text-bLight_3/80"
                : "text-gray-400/80"
            }`}
          >
            @{data.username}
          </p>
          {/* state --------------------------------------- */}
          <div className={`flex flex-row items-center mt-auto`}>
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                data.state === "Online"
                  ? "bg-org_2"
                  : data.state === "InGame"
                  ? "bg-bLight_3"
                  : "bg-gray-500"
              }`}
            ></span>
            <p className="text-white/60 text-xs mr-auto">{data.state}</p>
          </div>
        </div>

        {/* buttons --------------------------------------------- */}
        <Buttons data={data} />
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UserInfo;

// case possible for friend page button
// case 1: friend = true, friendRequest = false, friendRequistSent = false => show unfriend button
// case 2: friend = false, friendRequest = false, friendRequistSent = false => show add friend button
// case 3: friend = false, friendRequest = true, friendRequistSent = false => show accept button and decline button
// case 4: friend = false, friendRequest = false, friendRequistSent = true => show cancel request button
// case 5: friend = false, friendRequest = true, friendRequistSent = true => show cancel request button
