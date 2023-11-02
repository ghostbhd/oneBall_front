import PropTypes from "prop-types";
import { icons } from "../../constants";
import style from "../../style";

const Details = ({ data }) => {
  const ImgBg = ({ img }) => ({
    backgroundImage: `url('${img}')`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
  });

  const starPosition = "absolute -top-8 -right-8 w-[90px] h-[90px]";
  const pStyle = "text-sm text-bLight_5 leading-[.8]";
  const spanStyle = "text-2xl block text-bLight_3";

  return (
    <div className={`w-full flex flex-col p-10 h-max space-y-4`}>
      <div
        className={`w-3/4 h-[350px] flex relative mx-auto border-8 border-org_3 shadow-4xl shadow-org_1 ${style.rounded}`}
        style={ImgBg({ img: data.image })}
      >
        {<icons.star className={`${starPosition} text-org_1`} />}
        <div className={`flex ${starPosition}`}>
          <p className={`text-2xl w-max m-auto font-bold text-org_3`}>
            {data.level}.{data.xp / 100}
          </p>
        </div>
      </div>
      {/* xp and progress ------------------------ */}
      <div className="mx-auto w-3/4 flex flex-col">
        <div className="w-full flex flex-wrap">
          <p className="text-xs text-org_3 w-full">{data.xp} xp</p>
          <div className="w-11/12 h-2 my-auto bg-bDark_1 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-org_3 to-org_1 rounded-full"
              style={{ width: `${data.xp / 10}%` }}
            ></div>
          </div>
          <p className="w-1/12 mb-auto text-sm text-right text-org_1 font-serif">
            {data.level + 1}
          </p>
        </div>
        <div className="w-3/4 flex flex-col pt-8 space-y-4">
          <p className={pStyle}>
            Full Name
            <span className={spanStyle}>{data.fullName}</span>
          </p>
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
