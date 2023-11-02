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
      <div className="mx-auto w-3/4 flex flex-col">
        <p className="text-xs text-org_3">{data.xp} xp</p>
        {/* progress ------------------------ */}
        <div className="w-full h-4 flex flex-row">
          <div className="w-11/12 h-2 mt-auto bg-bDark_1 rounded-full">
            <div
              className="h-full bg-gradient-to-r from-org_3 to-org_1 rounded-full"
              style={{ width: `${data.xp / 10}%` }}
            ></div>
          </div>
          <p className="w-1/12 my-auto text-sm text-right text-org_1 align-top h-max">{data.level + 1}</p>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Details;
