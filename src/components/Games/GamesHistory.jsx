import style from "../../style";
import PropTypes from "prop-types";

const GamesHistory = ({ gamehistory }) => {
  return (
    <div
      className={`w-[30%] h-full ml-auto flex flex-col p-2 ${style.blueBlur} ${style.rounded}`}
    >
      {/* head ---------------------- */}
      <div className="h-max w-full flex flex-col items-center">
        <p className={`text-bLight_4 text-lg mb-auto p-2 w-full`}>History</p>
      </div>
      {/* body ---------------------- */}
      <div className={`h-auto ${style.rounded} w-full overflow-hidden mt-2`}>
        <ul
          className={`h-full w-full flex flex-col overflow-y-scroll
          ${style.rounded} ${style.blueBlur} !bg-opacity-30`}
        >
          {gamehistory &&
          Array.isArray(gamehistory) &&
          gamehistory.length > 0 ? ( // if is array and has items
            // map items
            gamehistory.map((item) => (
              <li
                key={item.id}
                className={`w-full flex flex-row text-bLight_4 align-middle
                bg-bLight_5/20 p-4 border-b-2 border-bDark_3`}
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
