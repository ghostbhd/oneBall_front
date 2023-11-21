
// // Messages.jsx
// import React from 'react';
// import ChatList from './ChatList';
// import ChatWindow from './ChatWindow';
// import style from '/home/hajar/Desktop/front/src/style.js';
// import { useState, useEffect } from "react";
// import SearchBar from '/home/hajar/Desktop/front/src/components/Messages/searchBar.jsx';
// import { mockChats } from '/home/hajar/Desktop/front/src/data/mockChats.js';


// const Messages: React.FC = () => {
//   const [activeChat, setActiveChat] = useState<number | null>(null);
//   const [searchTerm, setSearchTerm] = useState<string>('');

//   const handleSearch = (query: string) => {
//     setSearchTerm(query);
//   };
  
//   const filteredChats = mockChats.filter((chat) =>
//   chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  
//   );
//   // const handleSearchIconClick = () => {

//   // console.log("Search icon was clicked!");
//   // };


//   const handleSearchSubmit = (value) => {
//     console.log('Search submitted for:', value);
 
//   };

  
//   return (
//     <div className={`flex ${style.chatsone} ${style.rounded} ${style.blueBlur}`}>
//     <ChatList
//       activeChat={activeChat}
//       setActiveChat={setActiveChat}
//       // chats={filteredChats}
//       onSearch={handleSearch} 
//       // onIconClick={handleSearchIconClick} 
//       onSearchSubmit={handleSearchSubmit}  
//     />
//     <ChatWindow activeChat={activeChat} />
//   </div>
// );
// };
//   export default Messages;