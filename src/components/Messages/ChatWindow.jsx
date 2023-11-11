import React, { useState } from 'react';
import style from "../../style";

import { mockMessages } from '/home/hajar/Desktop/front/src/data/mockChats.js';

const ChatWindow = ({ activeChat }) => {
  const activeChatMessages = mockMessages.filter(message => message.chatId === activeChat);

  return (
  
    <div className={`w-9/12 ${style.contentW} bg-opacity-60 p-4 flex flex-col`}>
      <div className="flex items-center mb-4">
        <img className="w-12 h-12 rounded-full mr-4" src="path_to_avatar" alt="User Name" />
        <h2 className="text-white">User Name</h2>
      </div>

      <div className="chat-window">
      {activeChatMessages.map((message) => (
        <div key={message.id} className="message">
          <p className="message-text">{message.text}</p>
          <span className="message-time">{message.time}</span>
        </div>
      ))}
      </div>

      {/* Message input */}
      <div className="mt-auto">
        <input className="w-full p-2 rounded" placeholder="Type a message..." />
      </div>
    </div>
  );
};

export default ChatWindow;

