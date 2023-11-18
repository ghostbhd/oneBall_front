import style from "../../style";
import PropTypes from "prop-types";

const GamesHistory = ({ gamehistory }) => {
  return (
    <div
      className={`w-[38%] h-full ml-auto flex flex-col overflow-hidden px-1 ${style.rounded}`}
    >
      {/* head ---------------------- */}
      <div className="h-[10%] w-full flex flex-col items-center">
        <p
          className={`text-bLight_5 text-lg m-auto p-2 w-full bg-bDark_4 border-2 border-bDark_1/60 ${style.rounded}`}
        >
          History
        </p>
      </div>
      {/* body ---------------------- */}
      <div
        className={`h-[88%] ${style.rounded} w-full overflow-hidden mt-auto`}
      >
        <ul
          className={`h-full w-full flex flex-col overflow-y-scroll
        ${style.rounded} ${style.blueBlur} !bg-opacity-30`}
        >
          {gamehistory &&
          Array.isArray(gamehistory) &&
          gamehistory.length > 0 ? ( // if is array and has items
            gamehistory.map((item) => ( // map items
              <li
                key={item.id}
                className={`w-full flex flex-row text-bLight_4 align-middle
                bg-bDark_4/70 p-4 border-b-2 border-bDark_3`}
              >
                {/* opponent ----------- */}
                <span className="my-auto leading-[0.8] text-lest text-bLight_2 w-2/6 ">
                  {item.fullName}{" "}
                  <span className="block text-sm text-bLight_4">
                    @{item.opponent}
                  </span>
                </span>
                {/* result ----------- */}
                <span
                  className={`my-auto w-2/6 text-center font-bold ${
                    item.result === "win" ? "text-org_3" : "text-org_1"
                  }`}
                >
                  {item.result}
                </span>

                {/* date/time ----------- */}
                <div className="w-2/6 flex">
                  <span className="my-auto ml-auto text-center text-bLight_2 w-max leading-[.8]">
                    {item.time}{" "}
                    <span className="block text-sm text-bLight_4">
                      {item.date}
                    </span>
                  </span>
                </div>
              </li>
            ))
          ) : (
            // else
            <li className="text-bLight_4 text-center mt-4">No games yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

GamesHistory.propTypes = {
  gamehistory: PropTypes.array,
};

export default GamesHistory;
