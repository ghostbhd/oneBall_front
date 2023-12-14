

import React, { useState, useEffect } from "react";
import { HiUserGroup } from "react-icons/hi"; // Import the HiUserGroup icon
import { IoIosSend } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { useSocket } from "../../Socketio.jsx";
import style from "../../style";

const ChannelWindow = ({
  activeChat,
  currentUserToken,
//   setActiveChatMembers,
}) => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [showSidebar, setShowSidebar] = useState(false); // State to control the sidebar visibility

//   const socket = useSocket();

//   // Function to toggle the sidebar visibility
//   const toggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   // Function to handle sending a message
//   const handleSendMessage = () => {
//     if (message.trim()) {
//       const newMessage = {
//         content: message,
//         timestamp: new Date().toISOString(),
//         senderId: currentUserToken.id,
//         chatId: activeChat,
//       };

//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       socket.emit("send-message", {
//         chatId: activeChat,
//         content: message,
//         senderId: currentUserToken.id,
//       });

//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     if (socket == null) return;

//     socket.emit("join-channel", { channelId: activeChat });

//     // Add event listeners for channel-related socket events

//     return () => {
//       // Remove event listeners when the component unmounts
//       socket.off("new-message");
//       socket.off("channel-members");
//       socket.emit("leave-channel", { channelId: activeChat });
//     };
//   }, [activeChat, socket]);

//   // Other rendering logic for the messages and chat window here...

//   return (
//     <div className={`w-9/12 ${style.contentW} ${style.chatContainer}`}>
//       {/* Channel header */}
//       <div className="flex h-20 items-center rounded-t-lg bg-bDark_1 mb-5">
//         <HiUserGroup className="text-2xl cursor-pointer" onClick={toggleSidebar} />
//         <h2 className="text-black">Channel Name</h2>
//       </div>

//       {/* Message display */}
//       {/* ... Your message display code here ... */}

//       {/* Message input */}
//       <div className="flex items-center mt-auto p-2">
//         <input
//           className="w-full p-2 rounded-l-lg"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//         />
//         <button
//           onClick={handleSendMessage}
//           className="bg-indigo-300 p-3 rounded-r-lg"
//         >
//           <IoIosSend />
//         </button>
//       </div>
//     </div>
//   );
};

export default ChannelWindow;
