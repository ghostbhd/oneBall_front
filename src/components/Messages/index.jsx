
// Messages.jsx
import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import style from '/home/hajar/Desktop/front/src/style.js';
import { useState, useEffect } from "react";


const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className={`flex ${style.chatsone} ${style.rounded} ${style.blueBlur}`}>
      <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} />
    </div>
  );
};

  export default Messages;