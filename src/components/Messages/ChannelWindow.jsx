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
  const [membershipStatus, setMembershipStatus] = useState({
 
  });
  const [moreBadge, setMoreBadge] = useState(false);

  const socket = useSocket();
  const messageContainerRef = useRef(null);
  console.log("------------------------------>", membershipStatus);


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

  useEffect(() => {
    console.log("Socket connected:", socket.connected);

    if (activeChannel) {
      socket.emit("getChannelMessages", activeChannel);
    }

    
    socket.on("newChannelMessage", (newMessage) => {
      console.log("newChannelMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for channel messages ---------------------------------------------
    socket.on("channelMessages", (data) => {
      if (data && Array.isArray(data.messages)) {
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
      console.log("Received membership status^^^*******************************************:", data.isOwner);

      if (data.channelId === activeChannel) {
        console.log("Received membership status********************************************:", data.isOwner);
        setMembershipStatus({
          isMember: data.isMember,
          isAdmin: data.isAdmin,
          isOwner: data.isOwner,
          
        });
      }
    });

    return () => {
      socket.off("channelMessages");
      socket.off("channelMembershipStatus");
      socket.off("newChannelMessage");
      socket.off("joinChannelSuccess");
    };
  }, [socket, activeChannel]);

  const handleJoinChannel = () => {
    if (typeOfChannel === 'protected' && !showPasswordInput) {
      
      setShowPasswordInput(true);
    } else {
      
      socket.emit("joinChannel", {
        channelId: activeChannel,
        userId: currentUserToken.id,
        password: channelPassword,
      });
  
      // Reset states
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

  // More badge style -------
  
  const li = `p-2 hover:bg-bLight_5/50 hover:text-bLight_2 cursor-pointer`;

  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden ${style.blueBlur} ${style.rounded}`}
    >
      {showPasswordInput ? (
        // Password input ----------------------------------------------------------------
        <div className={`absolute w-full h-full left-0 top-0 bg-bDark_5/50`}>
          <div>
            <p>Enter password to access this channel</p>
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setChannelPassword(e.target.value)}
              placeholder="Enter #channel password"
            />
          </div>
        </div>
      ) : (
        <>
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

            {/* right button --------------------- */}
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
                <li className={`${li}`} onClick={() => setShowMembers(true)}>
                  Members
                </li>
                <li className={`${li}`} onClick={console.log("Ban")}>
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
          <ChannelMembers show={showMembers} setShow={setShowMembers} />

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
        </>
      )}
    </div>
  );
};

export default ChannelWindow;
