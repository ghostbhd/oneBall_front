import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../Socketio.jsx";
import style from "../../style";
import { HiUserGroup } from "react-icons/hi";

const ChannelWindow = ({ activeChannel, currentUserToken, typeOfChannel }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [channelPassword, setChannelPassword] = useState("");
  const [membershipStatus, setMembershipStatus] = useState({//!here where u can use bli admin or member or owner or owner
    isMember: false,
    isAdmin: false,
    isOwner: false,
  });

  const socket = useSocket();
  const messageContainerRef = useRef(null);

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
      if (data.channelId === activeChannel) {
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
    if (typeOfChannel === 'protected' && !showPasswordInput) {//! hena dert bli 5asha tkoun protected bach da5el password
      
      setShowPasswordInput(true);
    } else {
      //! For public channels (or after password is entered for protected channels)
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
    // still not handle it 
  };

  return (
    <div className={`w-full h-full flex flex-col`}>
      {/* Window navbar ---------------------------------------------------------------- */}
      <div
        className={`flex flex-row p-2 h-20 items-center rounded-t-lg bg-bDark_1 mb-5 `}
      >
        {/* Leave and Join buttons --------------- */}
        {membershipStatus.isMember ? (
          <button
            onClick={handleleaveChannel}
            className={`p-3 bg-org_3 text-white rounded-lg`}
          >
            Leave Channel
          </button>
        ) : (
          <button
            onClick={handleJoinChannel}
            className={`p-3 bg-bLight_5 text-white rounded-lg `}
          >
            Join Channel
          </button>
        )}
      </div>

      {/* Message display  ----------------------------------------------------------------------*/}
      <div
        className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}
        ref={messageContainerRef}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          (console.log(
            "Rendering messages, type of messages:",
            typeof messages
          ),
          Array.isArray(messages) &&
            messages.map((message) => (
              <div
                key={message.id}
                className={`my-2 p-2 rounded-lg max-w-[80%] ${
                  message.senderId === currentUserToken.id
                    ? style.messageCurrentUser
                    : style.messageOtherUser
                }`}
              >
                <div
                  className={`flex items-center mb-1 ${style.messageHeader}`}
                >
                  <img
                    src={message.avatar}
                    alt={currentUserToken.id}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-400">{message.username}</span>
                </div>
                <p>{message.Content}</p>
              </div>
            )))
        )}
      </div>

      {/* Message input ----------------------------------------------------------------------*/}
      <div className="flex items-center mt-auto p-2">
        <input
          className="w-full p-2 rounded-l-lg"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessagee()}
        />
        <button
          onClick={handleSendMessagee}
          className="bg-indigo-300 p-3 rounded-r-lg"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ChannelWindow;
