import GamesHistory from "./GamesHistory";
import { useState, useEffect } from "react";
import { gamesData } from "../../data/mockApi";
import Buttons from "./Buttons";
import style from "../../style";
import React from "react";
import InviteFriend from "./InviteFriend";
import { useSocket } from "../../Socketio";
import config from "../../config";
import { GetHeaders } from "../../jwt_token";

const Games = () => {
  const [data, setData] = useState([] as any);
  const [loading, setLoading] = useState(true as boolean);
  const socket = useSocket();

  const [showInviteFriend, setShowInviteFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState({} as any);
  const [friendList, setFriendList] = useState([] as any);

  const Header = GetHeaders().headers;
  useEffect(() => {
    // gamesData()
    fetch(`${config.domain}/history`, {
      method: "GET",
      headers: Header,
    })
      .then(async (dats) => {
        const data = await dats.json();
        console.log(data); // Log the data to check its structure
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching data", err);
        setLoading(false);
      });
  }, []);

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
                  setFriendList={setFriendList}
                  setShowInviteFriend={setShowInviteFriend}
                  setSelectedFriend={setSelectedFriend}
                  selectedFriend={selectedFriend}
                />
              )}
            </div>
          </div>

          {/* Game history --------------------------------------------*/}
          <GamesHistory gamehistory={data} />
        </>
      )}
    </div>
  );
};

export default Games;
