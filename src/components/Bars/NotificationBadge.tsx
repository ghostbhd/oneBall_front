import { icons } from "../../constants";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { ImgBg } from "../../style";
import { useSocket } from "../../Socketio";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotificationBadge: React.FC = ({
  notifRef,
  showNotif,
  setShowNotif,
}: any) => {
  const [notifItems, setNotifItems] = useState([]);
  const history = useNavigate();

  const socket: any = useSocket();
  const token = GetHeaders().jwttt;
  let decoded: any;
  if (token) decoded = jwtDecode.jwtDecode(token);
  else decoded = null;

  // add friend data to notification -------------------------------
  const addData = (obj: any) => {
    console.log("the username isiiiiiiii ", obj.username);
    setNotifItems((prevData): any => [...prevData, obj]);
  };

  // remove friend data to notification -------------------------------
  const removeFromData = (username: any) => {
    setNotifItems((prevData) =>
      prevData.filter((item: any) => item.username !== username)
    );
  };

  // add game data to notification -------------------------------
  const addGameInvite = (obj: any) => {
    console.log("the username isiiiiiiii ", obj.username);
    setNotifItems((prevData): any => [...prevData, obj]);
  };

  useEffect(() => {
    if (socket == null) return;

    // add notification to friend request -------------------------------
    socket.on("NotificationAdd", (reqData: any) => {
      // console.log("FriendRequests", reqData);
      const newData = {
        type: "friend",
        image: reqData.image,
        username: reqData.username,
        fullName: reqData.fullName,
      };
      // adding data to previous data
      console.log("the data is ", newData);
      addData(newData);
    });

    // add notification to game request -------------------------------
    socket.on("gameInvite", (reqData: any) => {
      console.log("game invite", reqData);
      const newData = {
        type: reqData.type,
        image: reqData.image,
        username: reqData.username,
        fullName: reqData.fullName,
      };
      // adding data to previous data
      console.log("the data is ", newData);
      addGameInvite(newData);
    });

    // game invite accepted --------------------------------------------
    socket.on("acceptgame", () => {
      // const newData = {
      //   username: reqData.username,

      // };
      // console.log("the accepted game is ", newData);
      // addGameInvite(newData);
      // socket.emit("startPlaying", {
      //   username1: decoded.name,
      //   username2:newData.username,
      // })
      history("/ingame");

    });

    // remove notification to friend request -------------------------------
    socket.on("Friend-Refuse", (reqData: any) => {
      // console.log("Refuse", data);
      const newData = {
        type: reqData.type,
        image: reqData.image,
        username: reqData.username,
        fullName: reqData.fullName,
      };
      removeFromData(newData.username);
      console.log("the data refused is ", newData);
    });

    // start playing ====================================
    // socket.on("startPlaying", (reqData:any) =>
    // {
    //   socket.emit("")
    // })

    // get all notification -------------------------------
    socket.on("Notif", (reqData: any) => {
      console.log("notiffffffff", reqData);
      setNotifItems([]);
      setNotifItems(reqData);
    });
    return () => {
      socket.off("Friend-Refuse");
      socket.off("Notif");
      socket.off("NotificationAdd");
      socket.off("gameInvite");
      socket.off("acceptgame");
    };
  }, [socket]);

  // Friend request ------------------------------------------------
  const handelAcceptFriend = (username) => {
    console.log("accept friend request");
    if (socket == null || !decoded) return;
    socket.emit("AcceptRequest", {
      username1: decoded.name,
      username2: username,
    });
    removeFromData(username);
  };

  // Friend reject ------------------------------------------------
  const handelRejecttFriend = (username) => {
    console.log("reject friend request ", username);
    if (socket == null || !decoded) return;
    socket.emit("RefuseRequest", {
      username1: decoded.name,
      username2: username,
    });
    removeFromData(username);
  };

  // Game request accept -------------------------------------------------------
  const handelAcceptGame = (username) => {
    console.log("play game");
    if (socket == null) return;
    socket.emit("accept:flan", { id: decoded.id, username: username });
    history("/ingame");
    // removeFromData(username);
  };

  // Game request reject -------------------------------------------------------
  const handelRejecttGame = (username) => {
    console.log("reject game");
  };

  // start playing -------------------------------------------------------
  const handelStartPlaying = (username) => {
    // console.log("start playing");
    // if (socket == null) return;
    
    // socket.emit("readytojoin:flan", { id: decoded.id, username: username });
    // removeFromData(username, type);
    history("/ingame");
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
        {notifItems.map((item: any, index) => (
          // friend request *********************************************************************************************
          <li className={`${li}`} key={index}>
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
            ) : item.type === "game" ? (
              // type = game in accepted request type = acceptedGame last one not yet

              // game invitaion *********************************************************************************************
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
                      onClick={() => handelAcceptGame(item.username)}
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
            ) : (
              <div
                className={`bg-gradient-to-r items-center gap-2 from-org_1/30 border-2 border-org_1/50 to-bDark_1  w-full flex p-1 rounded-full`}
              >
                <div
                  className={`${image} border-2 border-org_1/80`}
                  style={ImgBg({ img: item.image })}
                ></div>
                <div className={`flex items-center text-bLight_3`}>
                  <p>@{item.username}</p>
                </div>
                {/* buttons ----------------------------------------------------------- */}
                <div
                  className={`ml-auto text-lg px-4 rounded-full flex items-center`}
                >
                  {/* play request ------------------------------ */}
                  <div
                    className={`text-org_1/70 hover:text-org_1 cursor-pointer`}
                    onClick={() => handelStartPlaying(item.username)}
                  >
                    {<icons.play />}
                  </div>
                </div>
              </div>
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
