import React, { useState, useEffect } from "react";
import style from "../../style";
import { useSocket } from "../../Socketio";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";

const InviteFriend: React.FC = ({
  friendList,
  setFriendList,
  setShowInviteFriend,
  setSelectedFriend,
  selectedFriend,
}: any) => {
  const [showSelectFriend, setShowSelectFriend] = useState(false);
  const [ballSpeed, setBallSpeed] = useState("slow");
  const socket: any = useSocket();
  const token: any = GetHeaders().jwttt;
  const [errorFriend, setErrorFriend] = useState("");

  const userTok = jwtDecode.jwtDecode(token);

  useEffect(() => {
    if (socket == null) return;
    socket.on("Frinds-List", (data) => {
      if (data.length === 0) {
        setSelectedFriend({ username: "No friends", id: "" });
        return;
      }
      setFriendList(data);
      setSelectedFriend(data[0]);
    });

    return () => {
      socket.off("Frinds-List");
    };
  }, [socket]);

  // handel invite friend -----------------------------------------
  const handelInviteFriend = () => {
    console.log(selectedFriend);
    console.log(ballSpeed);
    if (selectedFriend.username === "No friends") {
      setErrorFriend("No friend selected");
      return;
    }

    // send invite to server --------------------------------------
    socket.emit("inv:flan", {
      id: userTok.id,
      opName: selectedFriend.username,
      ballSpeed: ballSpeed, // slow, medium, fast
    });
    // close modal -----------------------------------------------
    setErrorFriend("");
    setShowSelectFriend(false);
    setShowInviteFriend(false);
    setSelectedFriend("");
    setBallSpeed("slow");
  };

  return (
    <div className="fixed flex w-full h-full top-0 left-0 z-10 bg-bDark_5/70 backdrop-blur-2xl">
      {/* on click set the badge false -------------------------- */}
      <div
        className={`absolute w-full h-full left-0 top-0`}
        onClick={() => {
          setShowInviteFriend(false);
          setShowSelectFriend(false);
        }}
      ></div>

      {/* modal ----------------------------------------------- */}
      <div
        className={`${style.blueBlur} ${style.rounded} flex flex-col gap-4 w-72 p-4 h-max m-auto`}
      >
        {/* invite friend text ------ */}
        <p className={`text-bLight_4`}>Select friend to invite</p>
        {/* select friend ------ */}
        <div className="w-full flex flex-col flex h-max relative">
          <div className="w-full">
            <div
              className={`w-full cursor-pointer p-2 outline-none rounded-full bg-bDark_4 border-2 border-bLight_5/50 text-bLight_5`}
              onClick={() => setShowSelectFriend(!showSelectFriend)}
            >
              {selectedFriend.username}
            </div>
            <p className="w-full text-xs text-org_3 px-2">{errorFriend}</p>
          </div>
          {/* friend list --------------------------- */}
          {showSelectFriend && (
            <div className="absolute flex top-full max-h-48 h-max left-0 w-full overflow-hidden rounded-3xl">
              <div className="flex flex-col w-full h-full overflow-y-auto text-bLight_4 bg-bDark_4 rounded-3xl">
                {friendList.map((friend: any) => (
                  <div
                    key={friend.username}
                    className={`p-2 cursor-pointer hover:bg-bLight_5/20 transition-all duration-300`}
                    onClick={() => {
                      setSelectedFriend(friend);
                      setShowSelectFriend(false);
                    }}
                  >
                    @{friend.username}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Ball speed ----------------------- */}
        <p className={`text-bLight_4`}>Ball speed</p>
        <div
          className={`flex w-full justify-between items-center text-bLight_4`}
        >
          <div
            onClick={() => setBallSpeed("slow")}
            className={`cursor-pointer p-2 ${
              ballSpeed === "slow" && "bg-bLight_5/20 rounded-full"
            }`}
          >
            Slow
          </div>
          <div
            onClick={() => setBallSpeed("medium")}
            className={`cursor-pointer p-2 ${
              ballSpeed === "medium" && "bg-bLight_5/20 rounded-full"
            }`}
          >
            Medium
          </div>
          <div
            onClick={() => setBallSpeed("fast")}
            className={`cursor-pointer p-2 ${
              ballSpeed === "fast" && "bg-bLight_5/20 rounded-full"
            }`}
          >
            Fast
          </div>
        </div>
        {/* invite button ------ */}
        <div
          className={`w-full cursor-pointer p-2 rounded-full bg-org_3/40 border-2 
              border-org_3/50 text-org_1/80 text-center transition-all duration-300 hover:bg-org_3/60`}
          onClick={() => handelInviteFriend()}
        >
          Invite
        </div>
      </div>
    </div>
  );
};

export default InviteFriend;
