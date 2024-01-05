import { useState, useEffect, useRef } from "react";

import { useSocket } from "../../../Socketio.jsx";
import style, { ImgBg } from "../../../style";
import { chatIcons } from "../../../constants";
import ChannelMembers from "./ChannelMembers.jsx";
import WindowBody from "./WindowBody.jsx";
import AddPasswordInput from "./AddPasswordInput.jsx";
import ChangePasswordInput from "./ChangePasswordInput.jsx";
import FriendList from "./FriendList.jsx";

// import PropTypes from "prop-types";

const ChannelWindow = ({ activeChannel, currentUserToken, typeOfChannel }) => {
  // Channel messages ------------------
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Password input ------------
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showAddPassword, setShowAddPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [channelPassword, setChannelPassword] = useState("");

  const [membershipStatus, setMembershipStatus] = useState({});
  const [sender, setSender] = useState(null);

  // more button ----------------
  const [showMembers, setShowMembers] = useState(false);
  const [moreBadge, setMoreBadge] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);

  const socket = useSocket();
  // const messageContainerRef = useRef(null);
  const moreBadgeRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreBadgeRef.current &&
        !moreBadgeRef.current.contains(event.target)
      ) {
        setMoreBadge(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    if (activeChannel) {
      socket.emit("getChannelMessages", activeChannel);
    }

    socket.on("newChannelMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.emit("getSenderIdsInChannel", activeChannel);

    socket.on("senderIdsInChannel", (id) => {
      setSender(id);
    });

    // Listen for channel messages ---------------------------------------------
    socket.on("channelMessages", (data) => {
      if (data && Array.isArray(data.messages)) {
        console.log("data.messages", data);
        setMessages(data.messages);
      } else {
        setMessages([]);
      }
      // if (messageContainerRef.current) {
      //   messageContainerRef.current.scrollTop =
      //     messageContainerRef.current.scrollHeight;
      // }
    });

    // Listen for channel membership status -------------------------------------
    socket.emit("checkChannelMembership", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });

    socket.on("channelMembershipStatus", (data) => {
      if (data.channelId === activeChannel) {
        console.log("channelMembershipStatus", data);
        setMembershipStatus({
          channelName: data.channelName,
          isAdmin: data.isAdmin,
          isMember: data.isMember,
          isOwner: data.isOwner,
          isBuned: data.isBuned,
          isMuted: data.isMuted,
        });
      }
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      socket.off("channelMessages");
      socket.off("channelMembershipStatus");
      socket.off("newChannelMessage");
    };
  }, [socket, activeChannel, moreBadgeRef, currentUserToken.id]);

  useEffect(() => {
    console.log("membershipStatus", membershipStatus);
    // if (
    //   membershipStatus.isMember ||
    //   !membershipStatus.isMember ||
    //   !membershipStatus.isAdmin ||
    //   !membershipStatus.isOwner
    // ) {
      setShowMembers(false);
      setMoreBadge(false);
      setShowMembers(false);
      setShowFriendList(false);
      setShowAddPassword(false);
      setShowChangePassword(false);

    // }
  }, [activeChannel]);

  // Send message to channel --------------------------------------------------
  const handleSendMessagee = () => {
    if (newMessage.trim() !== "") {
      socket.emit("sendMessageToChannel", {
        channelId: activeChannel,
        senderId: currentUserToken.id,
        content: newMessage,
      });

      setNewMessage("");
    }
  };

  // Join channel -------------------------------------------------------------
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

  // Leave channel ------------------------------------------------------------
  const handleleaveChannel = () => {
    socket.emit("leaveChannel", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });
  };

  // Channel members ----------------------------------------------------------
  const handleChannelmembers = () => {
    socket.emit("getChannelMembers", activeChannel);
    setShowMembers(true);
    setMoreBadge(false);
  };

  const li = `p-2 hover:bg-bLight_5/50 hover:text-bLight_2 cursor-pointer`;

  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden ${style.blueBlur} ${style.rounded}`}
    >
      {membershipStatus.isBuned ? (
        <div className={`w-full h-full flex`}>
          <p className={`text-sm m-auto text-bLight_5`}>
            You are buned from this channel
          </p>
        </div>
      ) : (
        <>
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
            className={`flex flex-row p-4 px-6 h-max items-center rounded-t-lg bg-bDark_1/40 `}
          >
            {/* channel image and name ---------------------*/}
            <div className={`flex gap-2 items-center text-bLight_4`}>
              <p>#{membershipStatus.channelName}</p>
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
                  // ref={moreBadgeRef}
                  className={`text-3xl text-bLight_4 cursor-pointer transition-all duration-500 ${
                    moreBadge ? "rotate-90" : ""
                  }`}
                  onClick={() => setMoreBadge((prev) => !prev)}
                >
                  {<chatIcons.more />}
                </div>
              )}
              {/*more-badge ------------------------------- */}
              <ul
                ref={moreBadgeRef}
                className={`absolute z-10 text-sm text-bLight_4 right-1/2 flex flex-col overflow-hidden 
            top-full w-52 h-max bg-bDark_3 border-2 border-bLight_5/20 rounded-3xl ${
              moreBadge ? "" : "hidden"
            }`}
              >
                <li
                  className={`${li}`}
                  onClick={() => handleChannelmembers()}
                  ref={moreBadgeRef}
                >
                  Members
                </li>
                {membershipStatus.isOwner && typeOfChannel !== "private" ? (
                  typeOfChannel === "public" ? (
                    <li
                      onClick={() => setShowAddPassword(true)}
                      className={`${li}`}
                    >
                      Add password
                    </li>
                  ) : (
                    <li
                      onClick={() => setShowChangePassword(true)}
                      className={`${li}`}
                    >
                      Change password
                    </li>
                  )
                ) : membershipStatus.isOwner && typeOfChannel === "private" ? (
                  <li
                    onClick={() => setShowFriendList(true)}
                    className={`${li}`}
                  >
                    Add/Remove friends
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Add password input --------------------------------------------------------------- */}
          {showAddPassword && (
            <AddPasswordInput
              showAddPassword={showAddPassword}
              setShowAddPassword={setShowAddPassword}
            />
          )}

          {/* Change password input --------------------------------------------------------------- */}
          {showChangePassword && (
            <ChangePasswordInput
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
            />
          )}
          {/* Members ---------------------------------------------------------------- */}
          {showMembers && (
            <ChannelMembers
              show={showMembers}
              setShow={setShowMembers}
              activeChannel={activeChannel}
              currentUserToken={currentUserToken}
              membershipStatus={membershipStatus}
            />
          )}

          {/* Friend list ---------------------------------------------------------------- */}
          {showFriendList && (
            <FriendList showFriendList={showFriendList} setShowFriendList={setShowFriendList} />
          )}

          {/* Message display  ----------------------------------------------------------------------*/}
          <WindowBody
            // messageContainerRef={messageContainerRef}
            messages={messages}
            currentUserToken={currentUserToken}
          />

          {!membershipStatus.isMuted && (
            // Message input ----------------------------------------------------------------------
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
          )}
        </>
      )}
    </div>
  );
};

export default ChannelWindow;
