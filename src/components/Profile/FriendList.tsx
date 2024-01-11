import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import { Link } from "react-router-dom";
import { useSocket } from "../../Socketio";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  const socket = useSocket();
  const token = GetHeaders().jwttt;
  let decoded;
  if (token) decoded = jwtDecode.jwtDecode(token);
  else decoded = null;

  useEffect(() => {
    if (socket == null) return;
    socket.on("Frinds-List", (data) => {
      console.log("hte user is ", data);
      setFriends(data);
    });
    return () => {
      socket.off("Frinds-List");
    };
  }, [socket]);

  return (
    <div
      className={`w-full flex flex-col gap-4 mt-8 h-2/5 p-4 rounded-3xl bg-bLight_5/20`}
    >
      {/* title ------------------------ */}
      <p className="text-bLight_4 text-xl">Friends</p>
      {/* friend list ------------------------ */}
      <div className="w-full h-full flex rounded-3xl overflow-hidden border-2 border-bLight_5/20">
        <div
          className={`flex flex-wrap w-full gap-4  items-start justify-around overflow-y-auto p-2`}
        >
          {friends.map((friend, index) => (
            <Link
              to={`/profile/${friend.username}`}
              key={index}
              className="flex flex-col items-center cursor-pointer justify-center hover:bg-bDark_1/50 rounded-2xl p-2 transition-all duration-500"
            >
              <div
                className="w-16 h-16 rounded-2xl border-2 border-bLight_4/60 bg-bDark_1/50"
                style={ImgBg({ img: friend.image })}
              ></div>
              <p className="text-sm text-bLight_4">@{friend.username}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
