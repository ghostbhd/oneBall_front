import PropTypes from "prop-types";
import { icons } from "../../constants";
import style from "../../style";
import { ImgBg } from "../../style";

const Details = ({ data }) => {

  // position of the star and level ------------------------
  const starPosition = "absolute -top-8 -right-8 w-[90px] h-[90px]";
  // style of the p and span ------------------------
  const pStyle = "text-sm text-bLight_5 leading-[.8]";
  const spanStyle = "text-2xl block text-bLight_2";

  return (
    <div className={`w-full sm:flex hidden flex-col md:p-10 sm:p-2 sm:pt-10 h-max space-y-4`}>
      {/* image ------------------------ */}
      <div
        className={`w-3/4 md:h-[350px] sm:h-[280px] flex relative mx-auto border-8 border-org_3 shadow-4xl shadow-org_1 ${style.rounded}`}
        style={ImgBg({ img: data.image })}
      >
        {/* star icon -------*/}
        {<icons.star className={`${starPosition} text-org_1`} />}
        {/* level -----------*/}
        <div className={`flex ${starPosition}`}>
          <p className={`text-2xl w-max m-auto font-bold text-org_3`}>
            {data.level}.{data.xp / 100}
          </p>
        </div>
      </div>
      {/* xp and progress ------------------------ */}
      <div className="mx-auto w-3/4 flex flex-col">
        <div className="w-full flex flex-wrap">
          {/* xp ------------------------ */}
          <p className="text-xs text-org_3 w-full">{data.xp} xp</p>
          {/* progress bar ---------------- */}
          <div className="w-11/12 h-2 my-auto bg-bDark_1/40 rounded-full">
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

        <div className="w-3/4 flex flex-col pt-8 space-y-4">
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
  );
};

Details.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Details;
