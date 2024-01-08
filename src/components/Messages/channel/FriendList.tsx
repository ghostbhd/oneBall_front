import { useState, useEffect } from "react";
import style, { ImgBg } from "../../../style";
import { Link } from "react-router-dom";
import { useSocket } from "../../../Socketio.jsx";

const FriendList = ({
  showFriendList,
  setShowFriendList,
  activeChannel,
  currentUserToken,
}) => {
  const [friends, setFriends] = useState([]);

  const socket: any = useSocket();

  useEffect(() => {
    // channel members -----------------------
    socket.on("FrindsListIs", (data) => {
      console.log("the friend list issssssssss", data);
      setFriends(data);
    });
    //    console.log("Token is ", currentUserToken);

    return () => {
      socket.off("FrindsListIs");
    };
  }, [socket]);

  // Add friend to channel -----------------------------------------------
  const handelAddFriend = (requesterId) => {
    console.log("rah emitittt");
    socket.emit("addUsertoPrivateChannel", {
      channelId: activeChannel,
      userId: requesterId,
      currentUserId: currentUserToken.id,
      password: "",
    });
    console.log("add friend", activeChannel, currentUserToken.id, requesterId);
  };

  // Remove friend from channel -----------------------------------------------
  const handelRemoveFriend = (requesterId) => {
    console.log("remove friend");
    socket.emit("leavePrivateChannel", {
      channelId: activeChannel,
      userId: requesterId,
      currentUserId: currentUserToken.id,
    });
  };

  const buttonStyle = `ml-auto p-1 w-24 text-center cursor-pointer transition-all duration-300 rounded-full`;

  return (
    <div
      className={`fixed flex top-0 left-0 w-full h-full z-10 bg-bDark_5/70 p-4`}
    >
      {/* absolute class on click setShow to false ------- */}
      <div
        className={`absolute top-0 left-0 w-full h-full backdrop-blur-lg`}
        onClick={() => setShowFriendList(false)}
      ></div>
      <div
        className={`w-6/12 flex flex-col overflow-hidden h-full m-auto border-2 z-20 p-2
        border-bLight_5/20 bg-bDark_4/80 ${style.rounded}`}
      >
        {/* Header ------------------------------------------------------*/}
        <div className={`w-full h-max flex p-2 pl-4 text-bLight_4`}>
          <p>Add/Remove friend from channel</p>
        </div>
        {/* friend list ------------------------ */}
        <div className="w-full h-full flex rounded-3xl overflow-hidden border-2 border-bLight_5/20">
          <div className={`flex flex-col w-full overflow-y-auto p-2`}>
            {friends.map((friend, index) => (
              <div
                to={`/profile/${friend.username}`}
                key={index}
                className="flex w-full items-center gap-4 rounded-2xl p-2"
              >
                {/* image ---------------------- */}
                <div
                  className="w-16 h-16 rounded-2xl border-2 border-bLight_4/60 bg-bDark_1/50"
                  style={ImgBg({ img: friend.image })}
                ></div>
                {/* username ---------------------- */}
                <p className="text-sm text-bLight_4">@{friend.username}</p>
                {/* button ---------------------- */}
                {!friend.inChannel ? (
                  // Add button ----------------------
                  <div
                    className={`${buttonStyle} hover:bg-bLight_5/60 text-bLight_4 border-2 border-bLight_3/20 bg-bLight_5/40`}
                    onClick={() => handelAddFriend(friend.id)}
                  >
                    Add
                  </div>
                ) : (
                  // Remove button ----------------------
                  <div
                    className={`${buttonStyle} hover:bg-bDark_3 text-bDark_1 border-2 border-bLight_5/20 bg-bDark_3/40`}
                    onClick={() => handelRemoveFriend(friend.id)}
                  >
                    Remove
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendList;
