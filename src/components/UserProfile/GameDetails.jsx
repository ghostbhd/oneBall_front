import PropTypes from "prop-types";
import style from "../../style";

const GameDetails = ({ data }) => {
  const statDiv = `w-1/3 flex sm:p-4 p-2 rounded-2xl text-bLight_4 font-bold items-center ${style.blueBlur}`;
  const statNumber = `m-auto mr-4 sm:text-4xl text-3xl`;
  const statText = `mr-auto`;

  return (
    <div className={`w-full flex flex-row space-x-4`}>
      {/* game played --- */}
      <div className={`${statDiv}`}>
        <span className={`${statNumber}`}>{data.games}</span>
        <span className={`${statText}`}>Games</span>
      </div>
      {/* win -------- */}
      <div className={`${statDiv}`}>
        <span className={`${statNumber}`}>{data.win}</span>
        <span className={`${statText}`}>Win</span>
      </div>
      {/* lose -------- */}
      <div className={`${statDiv}`}>
        <span className={`${statNumber}`}>{data.lose}</span>
        <span className={`${statText}`}>Lose</span>
      </div>
    </div>
  );
};

GameDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GameDetails;
