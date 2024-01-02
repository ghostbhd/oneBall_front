import { icons } from "../../constants";
import PropTypes from "prop-types";
import { useState } from "react";
import style, { ImgBg } from "../../style";

const NotificationBadge = ({ notifRef, showNotif, setShowNotif }) => {
  const [notifItems, setNotifItems] = useState([
    {
      type: "friend",
      image: "/src/assets/avatar/Deadpool.jpg",
      username: "User1",
      fullName: "test test",
    },
    {
      type: "game",
      image: "/src/assets/avatar/Deadpool.jpg",
      username: "User2",
      fullName: "test test",
    },
    {
      type: "friend",
      image: "/src/assets/avatar/Deadpool.jpg",
      username: "User3",
      fullName: "test test",
    },
    {
      type: "game",
      image: "/src/assets/avatar/Deadpool.jpg",
      username: "User4",
      fullName: "test test",
    },
  ]);

  // Friend request ------------------------------------------------
  const handelAcceptFriend = (username) => {
    console.log("accept friend request");
  };

  const handelRejecttFriend = (username) => {
    console.log("reject friend request");
  };

  // Game request ------------------------------------------------
  const handelPlayGame = (username) => {
    console.log("play game");
  };

  const handelRejecttGame = (username) => {
    console.log("reject game");
  };

  // style ------------------------------------------------
  const li = `w-full flex gap-2 text-sm overflow-hidden`;
  const info = `flex gap-2 p-1 rounded-r-2xl w-full border-2 border-bLight_5/10`;
  const image = `w-10 h-10 rounded-full`;
  const firstIcon = `text-2xl flex items-center rounded-l-2xl px-1 text-bLight_5 border-2 border-bLight_5/10`;
  const buttons = `flex items-center gap-4 ml-auto px-4 text-lg`;

  return (
    <div
      ref={notifRef}
      className={`absolute right-0 top-0 z-50 flex flex-col max-h-screen sm:w-96 w-screen m-6
        p-2 ${style.rounded} bg-bDark_4  !border-bLight_3/10 shadow-4xl gap-4
      `}
    >
      {/* close badge ------ */}
      <div className={`w-full p-2 flex text-bLight_4`}>
        <div
          className={`ml-auto text-3xl cursor-pointer`}
          onClick={() => setShowNotif(false)}
        >
          {<icons.xmark />}
        </div>
      </div>

      {/* items ---------------- */}
      <ul className="w-full h-full flex flex-col gap-1 overflow-y-auto">
        {notifItems.map((item) => (
          // friend request *********************************************************************************************
          <>
            {item.type === "friend" ? (
              <li className={`${li}`}>
                {/* icon friend waiting ------------------------------------------------ */}
                <div className={`bg-bDark_4 ${firstIcon}`}>
                  {<icons.friendWaiting />}
                </div>
                {/* friend info -------------------------------------------------------- */}
                <div className={`bg-bDark_4 ${info}`}>
                  <div
                    className={`${image}`}
                    style={ImgBg({ img: item.image })}
                  ></div>
                  <div className={`flex flex-col text-bLight_5`}>
                    <p>{item.fullName}</p>
                    <p>@{item.username}</p>
                  </div>
                  {/* buttons ----------------------------------------------------------- */}
                  <div className={`${buttons}`}>
                    {/* accept friend request ------------------------------ */}
                    <div
                      className={`text-org_3 cursor-pointer`}
                      onClick={() => handelAcceptFriend(item.username)}
                    >
                      {<icons.check />}
                    </div>
                    {/* reject friend request ------------------------------ */}
                    <div
                      className={`text-bLight_4 cursor-pointer`}
                      onClick={() => handelRejecttFriend(item.username)}
                    >
                      {<icons.xmark />}
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              // game invitaion *********************************************************************************************
              <li className={`${li}`}>
                {/* icon game req ------------------------------------------------ */}
                <div className={`bg-bDark_3 ${firstIcon}`}>
                  {<icons.gameController />}
                </div>
                {/* game info -------------------------------------------------------- */}
                <div className={`bg-bDark_3 ${info}`}>
                  <div
                    className={`${image}`}
                    style={ImgBg({ img: item.image })}
                  ></div>
                  <div className={`flex flex-col text-bLight_5`}>
                    <p>{item.fullName}</p>
                    <p>@{item.username}</p>
                  </div>
                  {/* buttons ----------------------------------------------------------- */}
                  <div className={`${buttons}`}>
                    {/* play request ------------------------------ */}
                    <div
                      className={`text-org_3 cursor-pointer`}
                      onClick={() => handelPlayGame(item.username)}
                    >
                      {<icons.play />}
                    </div>
                    {/* reject friend request ------------------------------ */}
                    <div
                      className={`text-bLight_4 cursor-pointer`}
                      onClick={() => handelRejecttGame(item.username)}
                    >
                      {<icons.stop />}
                    </div>
                  </div>
                </div>
              </li>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

NotificationBadge.propTypes = {
  notifRef: PropTypes.object.isRequired,
  showNotif: PropTypes.bool.isRequired,
  setShowNotif: PropTypes.func.isRequired,
};

export default NotificationBadge;
