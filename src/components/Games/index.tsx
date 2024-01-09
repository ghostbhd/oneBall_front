import GamesHistory from "./GamesHistory";
import { useState, useEffect } from "react";
import { gamesData } from "../../data/mockApi";
import Buttons from "./Buttons";
import style from "../../style";
import React from "react";
import InviteFriend from "./InviteFriend";
import { useSocket } from "../../Socketio";

const Games = () => {
  const [data, setData] = useState([] as any);
  const [loading, setLoading] = useState(true as boolean);
  const socket = useSocket();

  const [showInviteFriend, setShowInviteFriend] = useState(false);
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
    gamesData()
      .then((data) => {
        console.log(data); // Log the data to check its structure
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // get friend list from server -------------------------------
    // ... socket.on frindlist
    setSelectedFriend(friendList[0]);
  }, [showInviteFriend]);

  return (
    <div
      className={`w-full md:p-8 p-4 md:pt-14 pb-20 h-full flex sm:flex-row flex-col gap-8`}
    >
      {loading ? (
        <p className="w-10 h-16 mx-auto text-bLight_4 text-lg font-bold text-center mt-16 animate-bounce">
          Loading...
        </p>
      ) : (
        <>
          {/* Game details -----------------------------------------*/}
          <div
            className={`md:w-8/12 gap-6 flex flex-col sm:w-7/12 w-full h-full`}
          >
            {/* buttons --------------------- */}
            <Buttons
              setShowInviteFriend={setShowInviteFriend}
              showInviteFriend={showInviteFriend}
            />

            {/* game details ---------------- */}
            <div
              className={`w-full overflow-hidden h-full flex ${style.blueBlur} ${style.rounded}`}
            >
              {showInviteFriend && (
                <InviteFriend
                  friendList={friendList}
                  setShowInviteFriend={setShowInviteFriend}
                  setSelectedFriend={setSelectedFriend}
                  selectedFriend={selectedFriend}
                />
              )}
            </div>
          </div>

          {/* Game history --------------------------------------------*/}
          <GamesHistory gamehistory={data.gamesHistory} />
        </>
      )}
    </div>
  );
};

export default Games;
