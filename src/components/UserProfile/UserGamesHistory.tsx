import style from "../../style";
import PropTypes from "prop-types";

const UserGamesHistory = ({ gamehistory }) => {
  return (
    <div
      className={`w-full h-full flex flex-col p-2 ${style.blueBlur} ${style.rounded}`}
    >
      {/* head ---------------------- */}
      <div className="w-full flex">
        <p className={`text-bLight_4 text-lg mb-auto p-2 w-full`}>History</p>
      </div>
      {/* body ---------------------- */}
      <div className={`h-auto ${style.rounded} w-full overflow-hidden mt-2`}>
        <ul
          className={`h-full w-full flex flex-col overflow-y-auto space-y-1
            ${style.rounded} !bg-opacity-30`}
        >
          {gamehistory &&
          Array.isArray(gamehistory) &&
          gamehistory.length > 0 ? ( // if is array and has items
            // map items
            gamehistory.map((item,index) => (
              <li
                key={index}
                className={`w-full flex flex-row text-bLight_4 align-middle
                bg-bDark_1/50 p-4`}
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
                  <span className="my-auto ml-auto text-right text-bLight_3 w-max leading-[.7]">
                    {item.time}
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

UserGamesHistory.propTypes = {
  gamehistory: PropTypes.array,
};

export default UserGamesHistory;
