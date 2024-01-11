import { icons } from "../../constants";
import { Link } from "react-router-dom";
import React from "react";
import { useSocket } from "../../Socketio";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";

const Buttons = ({ setShowInviteFriend, showInviteFriend }: any) => {
  const socket: any = useSocket();
  const token = GetHeaders().jwttt;
  let decoded = jwtDecode.jwtDecode(token);


  const handelGetFriendList = () => {
    if (socket == null) return;
    socket.emit("FriendList", decoded.id);
    setShowInviteFriend(!showInviteFriend);
  };

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
          onClick={() => handelGetFriendList()}
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
