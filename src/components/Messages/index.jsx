
import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import style from '/home/hajar/Desktop/front/src/style.js';
import { useState, useEffect } from "react";
import io from 'socket.io-client';
import ChannelCreation from './ChannelCreation.jsx';
import { useSocket } from '/home/hajar/Desktop/front/src/Socketio.jsx';


const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [latestMessages, setLatestMessages] = useState([]);
   const [showChannelCreation, setShowChannelCreation] = useState(false);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  
  // console.log(latestMessages);
  const filteredChats = latestMessages.filter((chat) =>
    chat.name && chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchIconClick = () => {

  console.log("Search icon was clicked!");
  };

  const toggleChannelCreationModal = () => {
    setShowChannelCreation(!showChannelCreation);
  };

  const handleSearchSubmit = (value) => {
    console.log('Search submitted for:', value);
 
  };

  
    return (
    <div className={`flex h-full ${style.chatsone} ${style.rounded} ${style.blueBlur} relative`}> {/* Add relative here for modal positioning */}
      <ChatList
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        chats={filteredChats}
        onSearch={handleSearch}
        onIconClick={toggleChannelCreationModal} 
        onSearchSubmit={handleSearchSubmit}
      />
      <ChatWindow activeChat={activeChat} />

      {showChannelCreation && ( 
        <ChannelCreation onClose={toggleChannelCreationModal} />
      )}
    </div>
  );
};
  export default Messages;