// mockData.js
export const mockChats = [
  { id: 1, name: 'hajar', message: 'Hi there!', time: '10:21 AM', avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg',status: 'online' },
  { id: 2, name: 'Mammy', message: 'How about you ?, can call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' ,status: 'online',},
  // { id: 2, name: 'Mammy', message: 'How about you ?, can kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkki call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg' ,status: 'online',},
  { id: 3, name: 'sis', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg' ,status: 'offline',},
  { id: 4, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg',status: 'inGame', },
  { id: 5, name: 'user', message: 'How about you ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg',status: 'online', },
  { id: 6, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg',status: 'offline', },
  { id: 7, name: 'user', message: 'How about you ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg',status: 'online', },
  { id: 8, name: 'user', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg',status: 'offline', },
  { id: 9, name: 'hajar', message: 'Hi there!', time: '10:21 AM', avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg',status: 'online' },
  { id: 10, name: 'Mammy', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg',status: 'offline', },
  { id: 11, name: 'sis', message: 'How are you?', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/f9/05/84/f905842672888a26019ef9da5ddacad6.jpg',status: 'offline', },
  { id: 5, name: 'user', message: 'How about yoxxxu ?, can i call u tonight', time: '11:30 AM', avatar: 'https://i.pinimg.com/236x/85/ad/1c/85ad1c288bb6cd280d97b737df61f54a.jpg',status: 'inGame', },
  
];

//sender is the user and the receiver is the other user (l3aks dyal lbackend)

export const mockMessages = [
  { id: 1, text: 'Hi there!', time: '9:38 AM', senderId: 1, receiverId: 2, chatId: 1 ,avatar: 'https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg' },
  { id: 2, text: 'How about you ?, can i call u tonight', time: '9:40 AM', senderId: 2, receiverId: 1, chatId: 1 },
  { id: 1, text: 'Hi there!', time: '9:38 AM', senderId: 1, receiverId: 2, chatId: 1 },
  { id: 2, text: 'How are you? ', time: '9:40 AM', senderId: 2, receiverId: 1, chatId: 1 },
  // { id: 3, text: 'I am fine,jjjjjjjjjjjjjjjhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjj thanks!', time: '9:42 AM', senderId: 1, receiverId: 2, chatId: 1 },
  { id: 4, text: 'How about you ?, can i call u tonight ', time: '9:44 AM', senderId: 1, receiverId: 2, chatId: 1 },
  
  { id: 5, text: 'I am fine too, thanks!', time: '9:46 AM', senderId: 2, receiverId: 1, chatId: 1 },
  
  { id: 6, text: 'Bye!', time: '9:48 AM', senderId: 2, receiverId: 1, chatId: 1 },

  { id: 7, text: 'whatsap!', time: '9:48 AM', senderId: 2, receiverId: 1, chatId: 2 },
  { id: 8, text: 'how are u!', time: '9:48 AM', senderId: 1, receiverId: 2, chatId: 2 },
  // { id: 9, text: 'whatsap!', time: '9:48 AM', senderId: 4, receiverId: 3, chatId: 3 },
  // { id: 10, text: 'whatsap!', time: '9:48 AM', senderId: 5, receiverId: 6, chatId: 4 },
  // { id: 11, text: 'whatsap!', time: '9:48 AM', senderId: 6, receiverId: 5, chatId: 5 },
    // Add more messages with different chatId values to simulate different chats
];



// /import React from "react";
// import style from "../../style";
// import { useState, useEffect } from "react";
// import SearchBar from "./searchBar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
// import { MdGroupAdd } from "react-icons/md";
// import ChannelCreation from "./ChannelCreation.jsx";
// import { useSocket } from "../../Socketio.jsx";

// const CURRENT_USER_ID = 1;

// const ChatList = ({ activeChat, setActiveChat, onSearch, onIconClick }) => {
//   const [chats, setChats] = useState([]);

//   const socket = useSocket();

//   useEffect(() => {
//     if (socket == null) return;

//     socket.emit("request-latest-messages", CURRENT_USER_ID);
    
//     socket.on("latest-messages", (chatsFromServer) => {
//       let sortedChats = chatsFromServer.sort((a, b) => {
//         return new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp);
//       });
//       sortedChats = sortedChats.reverse();
//       setChats(sortedChats);
//     });
//     const handleNewMessage = (newMessage) => {
//       setChats((prevChats) => {
//         let updatedChats = [...prevChats];

//         const chatIndex = updatedChats.findIndex(
//           (chat) => chat.id === newMessage.chatId
//         );

//         if (chatIndex > -1) {
//           // Update last message and timestamp for existing chat
//           updatedChats[chatIndex] = {
//             ...updatedChats[chatIndex],
//             lastMessage: newMessage.content,
//             timestamp: newMessage.Timestamp,
//           };
//         } else {
//           // Add new chat if it doesn't exist
//           updatedChats = [
//             ...updatedChats,
//             {
//               id: newMessage.chatId,
//               name: `User ${newMessage.senderId}`,
//               lastMessage: newMessage.content,
//               timestamp: newMessage.Timestamp,
//             },
//           ];
//         }
        
//         // Sort chats based on the timestamp
//         updatedChats.sort(
//           (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
//           );
          
//           return updatedChats;
//         });
//       };
      
//       socket.on("new-message", handleNewMessage);
      
//       // Cleanup on component unmount
//       return () => {
//         socket.off("latest-messages");
//         // console.log(`chat`, chats);
//       socket.off("new-message", handleNewMessage);
//     };


//   }, [socket, chats]);



//   const handleChatClick = (chatId) => {
//     setActiveChat(chatId);
//     socket.emit("request-messages-for-chat", {
//       chatId: chatId,
//     });
//   };
//   return (
//     <div
//       className={`w-3/12 flex-grow ${style.sidebarW} ${style.chatListContainer}`}
//     >
//       <div className={style.searchBar}>
//         <SearchBar onSearch={onSearch} onChannelIconClick={onIconClick} />
//       </div>
//       <div className="h-5/5 rounded-b-2xl flex-grow overflow-y-auto">
//         {chats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`flex items-center p-2 ${
//               style.transition
//             } hover:bg-opacity-70 ${
//               activeChat === chat.id ? style.activeChatItem : ""
//             }`}
//             onClick={() => handleChatClick(chat.id)}
//           >
//             {/*! Wrapper div with relative positioning */}
//             <div className="relative">
//               {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
//               <span
//                 className={`absolute w-12 h-12 rounded-full border-[3px] ${
//                   chat.status === "online"
//                     ? style.online
//                     : chat.status === "offline"
//                     ? style.offline
//                     : style.inGame
//                 }`}
//               ></span>
//               <img
//                 classNam{/*! Wrapper div with relative positioning */}
//             <div className="relative">
//               {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
//               <span
//                 className={`absolute w-12 h-12 rounded-full border-[3px] ${
//                   chat.status === "online"
//                     ? style.online
//                     : chat.status === "offline"
//                     ? style.offline
//                     : style.inGame
//                 }`}
//               ></span>
//               <img
//                 className="w-12 h-12 rounded-full "
//                 src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"
//                 alt={`${chat.name}`}
//               />
//             </div>
//             <div>
//               <h3 className="text-white px-3">{chat.name}</h3>
//               <p className="text-gray-400 px-3">{chat.lastMessage}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatList;

// The ID of the current user, for demonstration purposes
//     </div>
//   );
// };

// export default ChatList;

// The ID of the current user, for demonstration purposes




