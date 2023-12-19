import React, { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../Socketio.jsx";
import style from "../../style";
import { HiUserGroup } from "react-icons/hi";

const ChannelWindow = ({ activeChannel, currentUserToken }) => {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState("");
  // const [channelMembers, setChannelMembers] = useState([]);
  // const socket = useSocket();

  // useEffect(() => {
  //   if (!activeChannel) return;

    // Fetch channel members and initialize the messages here
    // You should have a way to retrieve the members and messages for the active channel
    // Replace the code below with your actual data fetching logic

    // Fetch channel members
  //   fetchChannelMembers(activeChannel.id);

    // Fetch channel messages
  //   fetchChannelMessages(activeChannel.id);
  // }, [activeChannel]);

  // const fetchChannelMembers = (channelId) => {
    // Use an API request or socket event to fetch channel members
    // Update the channelMembers state with the fetched data
  // };

  // const fetchChannelMessages = (channelId) => {
    // Use an API request or socket event to fetch channel messages
    // Update the messages state with the fetched data
  // };

  // const handleSendMessage = () => {
  //   if (message.trim()) {
  //     const newMessage = {
  //       content: message,
  //       timestamp: new Date().toISOString(),
  //       senderId: currentUserToken.id,
  //       channelId: activeChannel.id,
  //     };

      // Send the message to the server using sockets or an API
  //     sendMessageToServer(newMessage);

      // Update the local state with the new message
  //     setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear the message input
  //     setMessage("");
  //   }
  // };

  // const sendMessageToServer = (newMessage) => {
    // Send the message to the server using sockets or an API
    // You should have a mechanism for sending messages to the server
  // };

  // return (
  //   <div className={`w-9/12 ${style.contentW} ${style.chatContainer}`}>
  //     {/* Channel header */}
  //     <div className="flex h-20 items-center rounded-t-lg bg-bDark_1 mb-5">
  //       <div className="w-16 h-18 rounded-full mr-5">
  //         {/* You can replace this with the channel avatar */}
  //         <HiUserGroup />
  //       </div>
  //       <h2 className="text-black">{activeChannel?.name || "Default Channel"}</h2>
  //     </div>

  //     {/* Message display */}
  //     <div className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}>
  //       {messages.map((message) => (
  //         <div
  //           key={message.id}
  //           className={`mb-5 ${
  //             message.senderId === currentUserToken.id
  //               ? style.messageCurrentUser
  //               : style.messageOtherUser
  //           }`}
  //         >
  //           <p className="text-white">{message.content}</p>
  //           <span className="text-gray-400">
  //             {new Date(message.timestamp).toLocaleTimeString()}
  //           </span>
  //         </div>
  //       ))}
  //     </div>

  //     {/* Message input */}
  //     <div className="flex items-center mt-auto p-2">
  //       <input
  //         className="w-full p-2 rounded-l-lg"
  //         placeholder="Type a message..."
  //         value={message}
  //         onChange={(e) => setMessage(e.target.value)}
  //         onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
  //       />
  //       <button onClick={handleSendMessage} className="bg-indigo-300 p-3 rounded-r-lg">
  //         <IoIosSend />
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default ChannelWindow;
