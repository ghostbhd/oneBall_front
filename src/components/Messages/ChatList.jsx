import React from 'react';
import style from "../../style";
import  { useState, useEffect } from 'react';
import SearchBar from '/home/hajar/Desktop/front/src/components/Messages/searchBar.jsx';
import io from 'socket.io-client';


console.log("-----------1-------------------");

const socket = io('http://localhost:3009'); // Persist the socket connection outside of the useEffect

const ChatList = ({ activeChat, setActiveChat, onSearch }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.emit('request-latest-messages', 1);
    // Listen for the "connection" event
    socket.on('connection', data => {
      console.log(data);
    });

    // Listen for the "latest-messages" event
    
    socket.on('latest-messages', updatedChats => {
      console.log("Received latest messages 1:", updatedChats);
      setChats(updatedChats);
    });
    // Listen for the "new-message" event
    socket.on('new-message', newMessage => {
      setChats((prevChats) => {
        const chatToUpdateIndex = prevChats.findIndex(chat => chat.id === newMessage.chatId);
        if (chatToUpdateIndex >= 0) {
          const updatedChats = [...prevChats];
          updatedChats[chatToUpdateIndex].lastMessage = newMessage.content;
          return updatedChats;
        }
        return prevChats;
      });
    });
    
    // Emit a request for the latest messages

    // Cleanup function
    return () => {
      socket.off('connection');
      socket.off('latest-messages');
      socket.off('new-message');
      // socket.disconnect();
      // Do not disconnect the socket here
    };
  }, []);

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };

  return (
    <div className={`w-3/12 flex-grow  ${style.sidebarW} ${style.chatListContainer}`}>{/*cp courner sntg*/}
      <div className={style.searchBar}>
        <SearchBar onSearch={onSearch} />
      </div>
      <div className="h-5/5 rounded-b-2xl overflow-y-auto">
      {chats.map((chat) => (
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
      <img className="w-12 h-12 rounded-full " src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg" alt={`${chat.name}`} />
    </div>
    <div>
      <h3 className="text-white px-3">{chat.name}</h3>
      <p className="text-gray-400 px-3">{chat.lastMessage}</p>
    </div>
  </div>
))}
      </div>
    </div>
  );
};


export default ChatList;