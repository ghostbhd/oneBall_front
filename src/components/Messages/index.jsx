
// Messages.jsx
import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import style from '/home/hajar/Desktop/front/src/style.js';
import { useState, useEffect } from "react";
import SearchBar from '/home/hajar/Desktop/front/src/components/Messages/searchBar.jsx';
import { mockChats } from '/home/hajar/Desktop/front/src/data/mockChats.js';
import io from 'socket.io-client';

const socket = io('http://localhost:3009');

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('connection', (data) => {
  console.log(data); // 'Successfully connected to server'
});


const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
   const [latestMessages, setLatestMessages] = useState([]);

   useEffect(() => {
    socket.on('connect', () => {
    //   // console.log('Connected to the server');
    //   // Request latest messages for the user
    //   socket.emit('request-latest-messages', 2); // i need to Replace with actual user ID
    });

    socket.on('latest-messages', (messages) => {
      setLatestMessages(messages);
    });

    return () => {
      socket.off('connect');
    //   socket.off('latest-messages');
    };
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };
  
  console.log(latestMessages);
  const filteredChats = latestMessages.filter((chat) =>
    chat.name && chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // const handleSearchIconClick = () => {

  // console.log("Search icon was clicked!");
  // };


  const handleSearchSubmit = (value) => {
    console.log('Search submitted for:', value);
 
  };

  
  return (
    <div className={`flex h-full ${style.chatsone} ${style.rounded} ${style.blueBlur}`}>
    <ChatList
      activeChat={activeChat}
      setActiveChat={setActiveChat}
      chats={filteredChats}
      onSearch={handleSearch} 
      // onIconClick={handleSearchIconClick} 
      onSearchSubmit={handleSearchSubmit}  
    />
    <ChatWindow activeChat={activeChat} />
  </div>
);
};
  export default Messages;