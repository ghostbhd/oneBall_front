import React, { useEffect, useRef, useState } from "react";
import style from "../../style";
import { Link } from "react-router-dom";
import { icons } from "../../constants";
import InviteFriend from "./InviteFriend";

const GameBtn = () => {
  const [showInviteFriend, setShowInviteFriend] = useState(false);
  const [showSelectFriend, setShowSelectFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({} as any);

  const [friendList, setFriendList] = useState([
    { username: "friend1", id: 1 },
    { username: "friend2", id: 2 },
    { username: "friend3", id: 3 },
    { username: "friend4", id: 4 },
    { username: "friend5", id: 5 },
    { username: "friend6", id: 6 },
    { username: "friend7", id: 7 },
    { username: "friend8", id: 8 },
  ] as any);

  useEffect(() => {
    // get friend list from server -------------------------------
    // ... socket.on frindlist
    setSelectedFriend(friendList[0]);
  }, [showInviteFriend]);

  // handel get friend -------------------------------------------
  const handelGetFriend = () => {
    // get friend list from server -------------------------------
    // ...
    setShowInviteFriend(true);
  };

  // styling -----------------------------------------------
  const linkStyle = `w-full cursor-pointer h-50 md:p-1 p-4 flex flex-row bg-gradient-to-r shadow-4xl 
    ${style.rounded}`;
  const divContainerStyle = `md:w-2/6 w-2/6 flex flex-col items-center text-center`;
  const pStyle = "md:text-3xl text-2xl p-2 -translate-y-6 font-bold text-white";
  const imgStyle = "w-full -translate-x-6 -translate-y-14";
  const iconContainerStyle =
    "md:text-[80pt] text-[60pt] md:w-4/6 w-3/6 flex items-center";

  return (
    <div className={`flex flex-col h-max space-y-14 ${style.boxWidth}`}>
      {/* invite friend modal ------------------------------------- */}
      {showInviteFriend && (
        <InviteFriend
          friendList={friendList}
          setShowInviteFriend={setShowInviteFriend}
          showInviteFriend={showInviteFriend}
          setShowSelectFriend={setShowSelectFriend}
          showSelectFriend={showSelectFriend}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
      )}

      {/* Friend button --------------------------------------------- */}
      <div
        className={`${linkStyle} shadow-org_1 from-org_2 to-white`}
        onClick={() => handelGetFriend()}
      >
        <div className={`${divContainerStyle}`}>
          {/* Rocket image -------------- */}
          <img
            src="/src/assets/rocket.png"
            alt="rocket"
            className={`${imgStyle}`}
          />
          {/* Play with friend text -------------- */}
          <p className={`${pStyle}`}>Play with friend</p>
        </div>
        {/* Friends icon -------------- */}
        <div className={`${iconContainerStyle}`}>
          {<icons.friends className="w-full text-org_3 m-auto" />}
        </div>
      </div>

      {/* Random button ---------------------------------------- */}
      <Link
        to={"/ingame"}
        className={`${linkStyle} shadow-bLight_3 from-bLight_5 to-white`}
      >
        <div className={`${divContainerStyle}`}>
          {/* Rocket image ------------- */}
          <img
            src="/src/assets/rocket.png"
            alt="rocket"
            className={`${imgStyle}`}
          />
          {/* Play with random text ------------- */}
          <p className={`${pStyle}`}>Play with random</p>
        </div>
        {/* Random icon ------------- */}
        <div className={`${iconContainerStyle}`}>
          {<icons.random className="w-full text-bDark_1 m-auto" />}
        </div>
      </Link>
    </div>
  );
};

export default GameBtn;
