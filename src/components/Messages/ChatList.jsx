import React from 'react';
import style from "../../style";
import  { useState } from 'react';
import SearchBar from '/home/hajar/Desktop/front/src/components/Messages/searchBar.jsx';


import { mockChats } from '/home/hajar/Desktop/front/src/data/mockChats.js';


const ChatList = ({ activeChat, setActiveChat ,onSearch}) => {
  const handleChatClick = (chatId) => {
    setActiveChat(chatId);

  };

  return (
    <div className={`w-3/12 flex-grow  ${style.sidebarW} ${style.chatListContainer}`}>{/*cp courner sntg*/}
      <div className={style.searchBar}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="h-5/5 rounded-b-2xl overflow-y-auto">
      {mockChats.map((chat) => (
  <div
    key={chat.id}
    className={`flex items-center p-2 ${style.transition} hover:bg-opacity-70 ${activeChat === chat.id ? style.activeChatItem : ''}`}
    onClick={() => handleChatClick(chat.id)}
  >
    {/*! Wrapper div with relative positioning */}
    <div className="relative">
      {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
      <span className={`absolute w-12 h-12 rounded-full border-[3px]   ${chat.status === 'online' ? style.online : chat.status === 'offline' ? style.offline : style.inGame}`}>
      </span>
      <img className="w-12 h-12 rounded-full " src={chat.avatar} alt={`${chat.name}`} />
    </div>
    <div>
      <h3 className="text-white px-3">{chat.name}</h3>
      <p className="text-gray-400 px-3">{chat.message}</p>
    </div>
  </div>
))}
      </div>
    </div>
  );
};


export default ChatList;