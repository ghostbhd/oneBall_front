import PropTypes from "prop-types";
import { icons } from "../../constants";
import style from "../../style";
import { ImgBg } from "../../style";

const MDetails = ({ data }) => {
  // position of the star and level ------------------------
  const starPosition = "absolute top-1 right-1 w-[75px] h-[75px]";
  // style of the p and span ------------------------
  const pStyle = "text-sm text-bLight_4 leading-[.8]";
  const spanStyle = "text-2xl block text-bLight_1";

  return (
    <div
      className={`w-full flex sm:hidden relative overflow-hidden flex-col h-max rounded-t-[20px]`}
    >
      <div
        className={`flex flex-col w-full h-[250px]`}
        style={ImgBg({ img: data.image })}
      >
        {/* star icon -------*/}
        {<icons.star className={`${starPosition} text-org_3`} />}
        {/* level -----------*/}
        <div className={`flex ${starPosition}`}>
          <p className={`text-xl w-max m-auto font-bold text-org_1`}>
            {data.level}.{data.xp / 100}
          </p>
        </div>
        <div className="p-6 w-full h-full flex flex-col bg-gradient-to-r from-bDark_4/90 from-10% to-org_3/20">
          {/* Full Name and username ------------------------ */}
          <div className="my-auto flex flex-col space-y-6">
            {/* Full Name --------- */}
            <p className={pStyle}>
              Full Name
              <span className={spanStyle}>{data.fullName}</span>
            </p>
            {/* username --------- */}
            <p className={pStyle}>
              Username
              <span className={spanStyle}>@{data.username}</span>
            </p>
          </div>
        </div>
      </div>

      {/* xp and progress ------------------------ */}
      <div className={`w-full flex flex-wrap p-2 px-6 mt-2 rounded-b-[20px] ${style.blueBlur}`}>
        {/* xp ------------------------ */}
        <p className="text-xs text-org_3 w-full">{data.xp} xp</p>
        {/* progress bar ---------------- */}
        <div className="w-11/12 h-2 my-auto bg-bDark_1 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-org_3 to-org_1 rounded-full"
            style={{ width: `${data.xp / 10}%` }}
          ></div>
        </div>
        {/* Next level ------------------------ */}
        <p className="w-1/12 mb-auto text-sm text-right text-org_1 font-serif">
          {data.level + 1}
        </p>
      </div>
    </div>
  );
};

MDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default MDetails;
