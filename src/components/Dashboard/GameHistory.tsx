import style from "../../style";
import { icons } from "../../constants";
import { Link } from "react-router-dom";
import React from "react";

const GameHistory: React.FC = ({ last6Games }: any) => {
  return (
    <div
      className={`h-max flex flex-col p-5 px-6 bg-opacity-30 shadow-2xl 
    ${style.blueBlur} ${style.rounded} ${style.boxWidth}`}
    >
      {/* head ******************************************/}
      <div className={`flex w-full text-bLight_4 py-1`}>
        <span className="text-lg">Games history</span>
        <Link to="/games" className={`ml-auto text-3xl font-bold`}>
          {<icons.toRight />}
        </Link>
      </div>
      {/* details bar ********************************************* */}
      <div
        className={`w-full flex flex-row text-bLight_2 font-medium text-sm
          bg-bDark_4 p-2 px-4 mt-3 rounded-full border-b-2 border-r-2 border-bLight_5
        `}
      >
        <span>Versus</span>
        <span className="mx-auto w-5 text-center">Result</span>
        <span>Date/Time</span>
      </div>

      {/* game history list ************************************** */}
      <ul>
        {last6Games && Array.isArray(last6Games) && last6Games.length > 0 ? (
          last6Games.map((item, index) => (
            <li
              key={index}
              className={`w-full flex flex-row text-bLight_4 align-middle
                p-3 mt-2 rounded-2xl bg-bLight_5/40
              `}
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
          <li className="text-bLight_4 text-center mt-4">No games yet</li>
        )}
      </ul>
    </div>
  );
};



export default GameHistory;
