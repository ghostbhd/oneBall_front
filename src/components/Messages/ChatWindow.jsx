import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import style from "../../style";
import { IoIosSend } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { useSocket } from "../../Socketio.jsx";


const ChatWindow = ({ activeChat, activeChatUser, currentUserToken }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [received, setreceived] = useState(null);


  const socket = useSocket();


  console.log("message ->", received);

  console.log("*************************");

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {

        content: message,
        timestamp: new Date().toISOString(),
        senderId: currentUserToken.id,
        recieverId: received,
        chatId: activeChat,

      };
      console.log('Sending message:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send-message", {
        chatId: activeChat,
        content: message,
        senderId: currentUserToken.id,
        recieverId: received,
     



      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (socket == null) return;

    socket.emit("join-chat", { chatId: activeChat });
    console.log(`active chat is ${activeChat}`);


    const handleNewMessage = (newMessage) => {
      if (newMessage.chatId === activeChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("new-message", handleNewMessage);

    socket.on("messages-for-chat-response", (chatData) => {
      console.log("Chat data received:", chatData.chatReceiverId);

      if (chatData && Array.isArray(chatData.messages)) {
        console.log("Chat data received:", chatData);

    
        setreceived(chatData.chatReceiverId);

        setMessages(chatData.messages);

        const ids = chatData.messages.map((msg) => msg.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
          console.error("Non-unique IDs detected", ids);
        }
      } else {
        console.error("Incorrect chat data format received:", chatData);
      }
    });


    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("messages-for-chat-response");
      socket.emit("leave-chat", { chatId: activeChat });
    };

  }, [activeChat, socket, messages]);



  const sortedMessages = [...messages].sort(

    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  console.log(`active chat user is ${activeChatUser}`);
  return (
    <div className={`w-9/12  ${style.contentW} ${style.chatContainer}`}>
      {/* Chat header */}
      <div className="flex  h-20 items-center rounded-t-lg bg-bDark_1 mb-5">
        <img
          className="w-16 h-18  rounded-full  mr-5"
          src={activeChatUser?.avatar || "https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"} // Use the avatar from activeChatUser
          alt={activeChatUser?.name || "Default Name"}
        />
        <h2 className="text-black">{activeChatUser?.name || "Default Name"}</h2>
        {/* {!isChannel && ( // Conditionally render the more icon if it's not a channel
          <div className="relative">
          <FiMoreVertical onClick={handleOptionToggle} className="cursor-pointer" />
          {showOptions && (
            <div className="absolute right-0 bg-white shadow-lg rounded-lg p-2">
            <button onClick={handleBlockUser} className="block text-left p-2 hover:bg-gray-200 w-full">Block</button>
            <button onClick={handleInviteToGame} className="block text-left p-2 hover:bg-gray-200 w-full">Invite to game</button>
            </div>
            )} }
            </div>
         )} */}
      </div>

      {/* Message display  */}
      <div
        className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}
      >
        {sortedMessages.map((message) => {
          console.log('Message ID:', message.id);
          console.log('Sender ID:', message.senderId);
          console.log('Receiver ID:', currentUserToken.id); 
          console.log('Content:', message.content);
          console.log('Timestamp:', message.timestamp);
          console.log(`sender id is message.senderId, ${message.senderId} and currentUserToken.id is ${currentUserToken.id}`);
          return (
            <div
              key={message.id}
              className={`mb-5 ${message.senderId === currentUserToken.id
                  ? style.messageCurrentUser
                  : style.messageOtherUser
                }`}
            >
              <p className="text-white">{message.content}</p>
              {/* Format the timestamp as needed */}
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
