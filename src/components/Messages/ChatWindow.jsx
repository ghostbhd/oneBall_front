import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import style from "../../style";
import { useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { useSocket } from "../../Socketio.jsx";

const CURRENT_USER_ID = 1;

const ChatWindow = ({ activeChat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const socketRef = useRef();
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    // Emit event to join the chat and request messages
    socket.emit("join-chat", { chatId: activeChat });
    console.log(`Joining chat ${activeChat}`);
    // socket.emit('request-direct-messages', {
    //   receiverId: CURRENT_USER_ID,
    //   senderId: activeChat
    // });

    // Event listener for new messages
    const handleNewMessage = (newMessage) => {
      if (newMessage.chatId === activeChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    socket.on("new-message", handleNewMessage);

    // Event listener for response to messages for a chat request
    socket.on("messages-for-chat-response", (chatData) => {
      console.log("Chat data received:", chatData);
      if (chatData && Array.isArray(chatData.messages)) {
        setMessages(chatData.messages);
      } else {
        console.error("Incorrect chat data format received:", chatData);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("messages-for-chat-response");
      socket.emit("leave-chat", { chatId: activeChat });
    };
  }, [activeChat, socket]);

  console.log("activeChat", activeChat);
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log(`Sending message: ${message}`);
      socket.emit("send-message", {
        content: message,
        senderId: activeChat,
        receiverId: CURRENT_USER_ID,
        chatId: activeChat, // Here i need to make sure this is the ID of the chat session
      });
      console.log("chat id in handleSendMessage", chatId);
      setMessage("");
    }
  };

  return (
    <div className={`w-9/12  ${style.contentW} ${style.chatContainer}`}>
      {/* Chat header */}
      <div className="flex  h-20 items-center rounded-t-lg bg-bDark_1 mb-5">
        <img
          className="w-16 h-18  rounded-full  mr-5"
          src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"
          alt="User Name"
        />
        <h2 className="text-black">hajar</h2>
        {/* {!isChannel && ( // Conditionally render the more icon if it's not a channel
          <div className="relative">
            <FiMoreVertical onClick={handleOptionToggle} className="cursor-pointer" />
            {showOptions && (
              // <div className="absolute right-0 bg-white shadow-lg rounded-lg p-2">
              //   <button onClick={handleBlockUser} className="block text-left p-2 hover:bg-gray-200 w-full">Block</button>
              //   <button onClick={handleInviteToGame} className="block text-left p-2 hover:bg-gray-200 w-full">Invite to game</button>
              // </div>
            )} */}
        {/* </div> */}
        {/* )} */}
      </div>

      {/* Message display  */}
      <div
        className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}
      >
        {messages.map((message) => {
          const isCurrentUserSender = message.senderId === CURRENT_USER_ID;
          return (
            <div
              key={message.id}
              className={`mb-5 ${
                isCurrentUserSender
                  ? style.messageCurrentUser
                  : style.messageOtherUser
              }`}
            >
              <p className="text-white">{message.content}</p>
              <span className="text-gray-400">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Message input */}
      <div className="flex items-center mt-auto p-2">
        <input
          className="w-full p-2 rounded-l-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-300 p-3 rounded-r-lg"
        >
          <IoIosSend />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
