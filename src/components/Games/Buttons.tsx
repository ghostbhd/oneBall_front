import { icons } from "../../constants";
import { Link } from "react-router-dom";
import React from "react";

const Buttons = ({setShowInviteFriend, showInviteFriend} : any) => {
  const container = "flex w-1/2";
  const button = `flex flex-row gap-6 p-4 items-center w-full 
  rounded-4xl bg-gradient-to-r shadow-btn justify-center`;

  const icon = "md:text-5xl sm:text-4xl text-3xl text-white";
  const text = "md:text-2xl sm:text-xl text-base";

  return (
    <div className={`flex flex-row gap-8 w-full`}>
      {/* with friend button */}
      <div className={container}>
        <div
          onClick={() => setShowInviteFriend(!showInviteFriend)}
          className={` ${button} cursor-pointer from-org_2 to-white shadow-org_1`}
        >
          <div className={icon}>{<icons.friends />}</div>
          <p className={`${text} text-org_3 font-bold`}>Play with friend</p>
        </div>
      </div>
      {/* with random button */}
      <div className={container}>
        <Link
          to={"/ingame"}
          className={` ${button} ml-auto from-bLight_5 to-white shadow-bLight_3`}
        >
          <div className={icon}>{<icons.random />}</div>
          <p className={`${text} text-bDark_1 font-bold`}>Play with random</p>
        </Link>
      </div>
    </div>
  );
};

export default Buttons;
