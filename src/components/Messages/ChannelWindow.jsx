import { useState, useEffect, useRef } from "react";

import { useSocket } from "../../Socketio.jsx";
import style, { ImgBg } from "../../style";
import { chatIcons } from "../../constants";
import ChannelMembers from "./ChannelMembers.jsx";

const ChannelWindow = ({ activeChannel, currentUserToken, typeOfChannel }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [channelPassword, setChannelPassword] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [sender, setSender] = useState(null);
  const [membershipStatus, setMembershipStatus] = useState({});
  const [moreBadge, setMoreBadge] = useState(false);

  const socket = useSocket();
  const messageContainerRef = useRef(null);
  console.log("------------------------------>", membershipStatus);

  useEffect(() => {
    console.log("Socket connected:", socket.connected);

    if (activeChannel) {
      socket.emit("getChannelMessages", activeChannel);
    }

    // setShowPasswordInput(false);
    socket.on("newChannelMessage", (newMessage) => {
      console.log("newChannelMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.emit("getSenderIdsInChannel", activeChannel);

    socket.on("senderIdsInChannel", (id) => {
      console.log("sender id is---------------------------------------", id);

      setSender(id);
    });

    // Listen for channel messages ---------------------------------------------
    socket.on("channelMessages", (data) => {
      if (data && Array.isArray(data.messages)) {
        console.log("channelMessages", data);
        // console.log("sender*******************************************:", data.messages.id);
        setMessages(data.messages);
      } else {
        console.error("Received invalid format for channelMessages", data);
        setMessages([]);
      }
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    });

    // Listen for channel membership status -------------------------------------
    socket.emit("checkChannelMembership", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });

    socket.on("channelMembershipStatus", (data) => {
      if (data.channelId === activeChannel) {
        setMembershipStatus({
          isAdmin: data.isAdmin,
          isMember: data.isMember,
          isOwner: data.isOwner,
        });
      }
    });

    return () => {
      socket.off("channelMessages");
      socket.off("channelMembershipStatus");
      socket.off("newChannelMessage");
    };
  }, [socket, activeChannel]);

  const handleSendMessagee = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessageToChannel", {
        channelId: activeChannel,
        senderId: currentUserToken.id,
        content: newMessage,
      });

      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleJoinChannel = () => {
    if (typeOfChannel === "protected" && !showPasswordInput) {
      setShowPasswordInput(true);
    } else {
      socket.emit("joinChannel", {
        channelId: activeChannel,
        userId: currentUserToken.id,
        password: channelPassword,
      });
      setShowPasswordInput(false);
      setChannelPassword("");
    }
  };

  const handleleaveChannel = () => {
    console.log("---------> leave channel clicked");
    socket.emit("leaveChannel", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });
  };

  const handleChannelmembers = () => {
    console.log("---------> channel members clicked");
    socket.emit("getChannelMembers", activeChannel);
    setShowMembers(true);
  };

  const handleSetAdmin = () => {
    // socket.emit("setUserAsAdmin", activeChannel, currentUserToken.id);
  };

  const handleRemoveAdmin = () => {};

  const li = `p-2 hover:bg-bLight_5/50 hover:text-bLight_2 cursor-pointer`;

  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden ${style.blueBlur} ${style.rounded}`}
    >
      {/* Password input --------------------------------------------------------------- */}
      <div
        className={`absolute w-full z-10 h-full top-0 left-0 bg-bDark_5/40 flex ${
          showPasswordInput ? "" : "hidden"
        }`}
      >
        <div
          className={`absolute w-full h-full left-0 top-0`}
          onClick={() => setShowPasswordInput(false)}
        ></div>
        <div
          className={`w-1/3 flex flex-col p-4 rounded-3xl gap-4 h-max m-auto ${style.blueBlur}`}
        >
          <p className={`text-sm text-bLight_5`}>Protected Channel</p>
          <input
            type="password"
            className={`w-full rounded-full p-2 outline-none bg-bDark_4 border-2 border-bLight_5/20 text-bLight_4 placeholder:text-bLight_5`}
            placeholder="Enter password"
            value={channelPassword}
            onChange={(e) => setChannelPassword(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleJoinChannel}
          />

          <button
            onClick={handleJoinChannel}
            className={`p-3 w-full bg-bLight_5/50 text-bLight_2 hover:bg-bLight_5/80 transition-all rounded-2xl`}
          >
            Confirm
          </button>
        </div>
      </div>
      {/* Window navbar ---------------------------------------------------------------- */}
      <div
        className={`flex flex-row p-2 pr-6 h-max items-center rounded-t-lg bg-bDark_1/40 `}
      >
        {/* channel image and name ---------------------*/}
        <div className={`flex gap-2 items-center text-bLight_4`}>
          <div
            className={`w-16 h-16 rounded-full border-2 border-bLight_5/80`}
            style={ImgBg({ img: "/src/assets/avatar/Deadpool.jpg" })}
          ></div>
          <p>#Channel</p>
        </div>

        {/* right button --------------------------------------------------------------- */}
        <div className={`w-max ml-auto relative flex`}>
          {!membershipStatus.isMember &&
          !membershipStatus.isAdmin &&
          !membershipStatus.isOwner ? (
            // Join buttons --------------------
            <button
              onClick={handleJoinChannel}
              className={`p-3 bg-bLight_5 text-white rounded-lg`}
            >
              Join Channel
            </button>
          ) : membershipStatus.isMember ? (
            // Leave button --------------------
            <button
              onClick={handleleaveChannel}
              className={`p-3 bg-org_3 text-white rounded-lg`}
            >
              Leave Channel
            </button>
          ) : (
            // More button -----------------------------
            <div
              className={`text-2xl text-bLight_4 cursor-pointer`}
              onClick={() => setMoreBadge(!moreBadge)}
            >
              {<chatIcons.more />}
            </div>
          )}
          {/*more badge ------------------------------- */}
          <ul
            className={`absolute z-10 text-sm text-bLight_4 right-1/2 flex flex-col overflow-hidden 
              top-full w-52 h-max bg-bDark_3 border-2 border-bLight_5/20 rounded-3xl ${
                moreBadge ? "" : "hidden"
              }`}
          >
            <li className={`${li}`} onClick={() => handleChannelmembers()}>
              Members
            </li>
            <li className={`${li}`} onClick={handleSetAdmin()}>
              Set an admin
            </li>
            {membershipStatus.isOwner ? (
              <li className={`${li}`} onClick={console.log("change pass")}>
                Edit Password
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Members ---------------------------------------------------------------- */}
      <ChannelMembers
        show={showMembers}
        setShow={setShowMembers}
        activeChannel={activeChannel}
        currentUserToken={currentUserToken}
      />

      {/* Message display  ----------------------------------------------------------------------*/}
      <div
        className={`flex w-full px-5 flex-col scroll-mb-0 overflow-y-auto ${style.chatWindowMessages}`}
        ref={messageContainerRef}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p className={`mx-auto mt-5 text-sm text-bLight_4/80`}>
            No messages yet.
          </p>
        ) : (
          messages.map((message) => (
            // Message item ----------------------
            <div
              key={message.id}
              className={`my-2 p-2 rounded-lg w-7/12 relative flex gap-2 align-baseline ${
                message.senderId === currentUserToken.id
                  ? "ml-auto text-right p-2 rounded-lg flex-row-reverse items-end"
                  : "text-left p-2 rounded-lg"
              }`}
            >
              <div className={`flex flex-col items-center`}>
                {/* Image -------------------*/}
                <div
                  style={ImgBg({ img: message.avatar })}
                  className={`w-8 h-8 rounded-full`}
                ></div>
                {/* username ----------------- */}
                <span className="text-bLight_4 text-xs">
                  @{message.username}
                </span>
              </div>

              {/* content ------------------ */}
              <p
                className={`w-max max-w-full text-bLight_2 p-3 whitespace-normal break-words  text-sm rounded-2xl ${
                  message.senderId === currentUserToken.id
                    ? "bg-bLight_5/40"
                    : "bg-org_1/20"
                }`}
              >
                {message.Content}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Message input ----------------------------------------------------------------------*/}
      <div className="flex w-full p-2 px-4">
        <div
          className={`w-full mx-auto flex flex-row items-center rounded-full p-2 px-4
          overflow-hidden bg-bDark_3/80 text-sm border-2 border-bLight_5/40 text-bLight_3`}
        >
          <input
            className="w-full outline-none bg-transparent placeholder:text-bLight_5"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessagee()}
          />
          <button
            onClick={handleSendMessagee}
            className="text-2xl text-bLight_4"
          >
            {<chatIcons.send />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelWindow;
