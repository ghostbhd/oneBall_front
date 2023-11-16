// import React from 'react';
// import style from "../../style";
// import  { useState } from 'react';
// import SearchBar from '/home/hajar/Desktop/front/src/components/Messages/searchBar.tsx';


// import { mockChats } from '/home/hajar/Desktop/front/src/data/mockChats.js';

// interface ChatListProps {
//   activeChat: number | null;
//   setActiveChat: (chatId: number) => void;
//   onSearch: (query: string) => void;
//   onSearchSubmit: (value: string) => void; // Add this line
// }

// const ChatList: React.FC<ChatListProps> = ({ activeChat, setActiveChat, onSearch }) => {
//   const handleChatClick = (chatId) => {
//     setActiveChat(chatId);

//   };

//   return (
//     <div className={`w-3/12 flex-grow ${style.sidebarW} ${style.chatListContainer}`}>

//       <div className={style.searchBar}>
//         <SearchBar onSearch={onSearch} />
//       </div>

//       <div className="h-5/5   rounded-b-2xl overflow-y-auto ">
//         {mockChats.map((chat) => (
//           <div
//             key={chat.id}
//             className={`flex items-center p-2 ${style.transition} hover:bg-opacity-70 ${activeChat === chat.id ? style.activeChatItem : ''}`}
//             onClick={() => handleChatClick(chat.id)}
//           >
//             <img className="w-10 h-9 rounded-full mr-4" src={chat.avatar} alt={`${chat.name}`} />
//             <div>
//               <h3 className="text-white">{chat.name}</h3>
//               <p className="text-gray-400">{chat.message}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatList;