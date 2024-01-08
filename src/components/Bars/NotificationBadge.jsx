import { icons } from "../../constants";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import { useSocket } from "../../Socketio";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode  from "jwt-decode";

const NotificationBadge = ({ notifRef, showNotif, setShowNotif }) => {
  const [notifItems, setNotifItems] = useState([]);
  const removeFromData = (username) => {
    setNotifItems((prevData) => prevData.filter((item) => item.username !== username));
  };
  const addData = (obj) => {
    console.log("the username isiiiiiiii ", obj.username)
      setNotifItems( prevData => [...prevData, obj]);
  };
  const socket = useSocket();
  const token = GetHeaders().jwttt;
  let decoded;
  if (token)
    decoded = jwtDecode.jwtDecode(token);
  else
    decoded = null;

  useEffect(() => {
    if (socket == null) return;
    socket.on("NotificationAdd", (reqData) => {
      // console.log("FriendRequests", reqData);
      const newData = {
        type: "friend",
        image: reqData.image,
        username: reqData.username,
        fullName: reqData.fullName,
      };
      // adding data to previous data
      console.log("the data is ", newData)
      addData(newData);
    });

    socket.on("Friend-Refuse", (reqData) => {
      // console.log("Refuse", data);
      const newData = {
        type: "friend",
        image: reqData.image,
        username: reqData.username,
        fullName: reqData.fullName,
      };
      removeFromData(newData.username);
      console.log("the data refused is ", newData)
    });

    socket.on("Notif", (reqData) => {
      // console.log("FriendRequests", reqData);
      reqData.map((element) => {

        const newData = {
          type: "friend",
          image: element.image,
          username: element.username,
          fullName: element.fullName,
        };
      // adding data to previous data
        console.log("the data is ", newData)
        const isDuplicate = notifItems.some(item => item.username === newData.username);
        if (!isDuplicate)
          addData(newData);
      })
    });
    return () => {
      socket.off("Friend-Refuse");
      socket.off("Notif");
      socket.off("NotificationAdd");
    };
  }, [socket]);
  
  // Friend request ------------------------------------------------
  const handelAcceptFriend = (username) => {
    console.log("accept friend request");
    if (socket == null) return;
    socket.emit("AcceptRequest", {
      username1: decoded.name,
      username2: username,
    })
    removeFromData(username);
  };

  const handelRejecttFriend = (username) => {
    console.log("reject friend request ", username);
    if (socket == null) return;
    socket.emit("RefuseRequest", {
      username1: decoded.name,
      username2: username,
    });
    removeFromData(username);
  };

  // Game request ------------------------------------------------
  const handelPlayGame = (username) => {
    console.log("play game");
  };

  const handelRejecttGame = (username) => {
    console.log("reject game");
  };


  // useEffect(() => {

  // }, [socket]);

  // style ------------------------------------------------
  const li = `w-full flex gap-2 text-sm overflow-hidden`;
  const info = `flex gap-2 p-1 rounded-r-2xl w-full border-2 border-bLight_5/10`;
  const image = `w-10 h-10 rounded-full`;
  const firstIcon = `text-2xl flex items-center rounded-l-2xl px-1 text-bLight_5 border-2 border-bLight_5/10`;
  const buttons = `flex items-center gap-4 ml-auto px-4 text-lg`;

  return (
    <div
      ref={notifRef}
      className={`absolute right-0 top-0 z-50 flex flex-col h-screen sm:w-96 w-screen
        p-2 bg-bDark_4  !border-bLight_3/10 shadow-4xl gap-4 transform transition-all ease-in-out duration-400 ${
          showNotif ? "translate-x-0" : "translate-x-full"
        }
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
          // <>
          <li className={`${li}`} key={item.username}>
            {item.type === "friend" ? (
              <>
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
              </>
            ) : (
              // </li>
              // game invitaion *********************************************************************************************
              // <li className={`${li}`} key={item.username}>
              <>
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
              </>
            )}
          </li>
          // </>
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