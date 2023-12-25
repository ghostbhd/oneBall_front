import React, { useState, useEffect, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../Socketio.jsx";
import style from "../../style";
import { HiUserGroup } from "react-icons/hi";

const ChannelWindow = ({ activeChannel, currentUserToken }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [channelPassword, setChannelPassword] = useState("");
  const [isMember, setIsMember] = useState(false);

  const socket = useSocket();
  const messageContainerRef = useRef(null);
  console.log("*************************");

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
      console.log('Socket connected:', socket.connected);
    if (activeChannel) {
      socket.emit("getChannelMessages", activeChannel);
    }
    
    
    socket.on("newChannelMessage", (newMessage) => {
      console.log("newChannelMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    
    socket.on("channelMessages", (data) => {
      if (data && Array.isArray(data.messages)) {
          setMessages(data.messages);
      } else {
          console.error("Received invalid format for channelMessages", data);
          setMessages([]); 
      }
      // console.log("channelMessages", channelMessages);
      if (messageContainerRef.current) {
        messageContainerRef.current.scrollTop =
          messageContainerRef.current.scrollHeight;
      }
    });
    

    socket.emit("checkChannelMembership", {
      channelId: activeChannel,
      userId: currentUserToken.id,
    });

    socket.on("channelMembershipStatus", (status) => {
      setIsMember(status);
      console.log("channelMembershipStatus", status);
    });

    return () => {
      socket.off("channelMessages");
      socket.off("channelMembershipStatus");
      socket.off("newChannelMessage");
    };
  }, [socket, activeChannel]);

  const handleJoinChannel = () => {
    if (!isMember) {
      if (showPasswordInput) {
        // Join with provided password
        console.log("--------------------------------");
        socket.emit("joinChannel", {
          channelId: activeChannel,
          userId: currentUserToken.id,
          password: channelPassword,
        });
      } else {
        // Show password input for protected channels
        setShowPasswordInput(true);
      }
    }
  };

  return (
    <div className={`w-9/12  ${style.contentW} ${style.chatContainer}`}>
      <div
        className={`flex justify-between h-20 items-center rounded-t-lg bg-bDark_1 mb-5 `}
      >
        <h2 className="text-white">{activeChannel}</h2>
        {isMember ? (
          <span className="text-green-500">Member</span>
        ) : (
          <button
            onClick={handleJoinChannel}
            className={`px-3 py-1 ${style.joinButton}`}
          >
            {showPasswordInput ? "Joined" : "Join Channel"}
          </button>
        )}
      </div>
      <div
        className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}
        ref={messageContainerRef}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p>No messages yet.</p> 
        ) : (
          console.log("Rendering messages, type of messages:", typeof messages),
          Array.isArray(messages) &&  messages.map((message) => (
            <div
              key={message.id}
              className={`my-2 p-2 rounded-lg max-w-[80%] ${
                message.senderId === currentUserToken.id
                  ? style.messageCurrentUser
                  : style.messageOtherUser
              }`}
            >
              <div className={`flex items-center mb-1 ${style.messageHeader}`}>
                <img
                  src={message.avatar}
                  alt={ currentUserToken.id}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-400">{message.username}</span>
              </div>
              <p>{message.Content}</p>
            </div>
          ))
        )}
      </div>
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
