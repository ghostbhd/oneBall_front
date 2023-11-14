import React, { useState } from 'react';
import style from "../../style";

import { mockMessages } from '/home/hajar/Desktop/front/src/data/mockChats.js';

const ChatWindow = ({ activeChat }) => {

  const CURRENT_USER_ID = 1;//! This should be the id of the current user
  const activeChatMessages = mockMessages.filter(message => message.chatId === activeChat);


  return (
    <div className={`w-9/12 ${style.contentW} ${style.chatContainer}`}>
      {/* Chat header */}
      <div className="flex items-center mb-5">

        <img className="w-11 h-18 rounded-full mr-5" src="path_to_avatar" alt="User Name" />
        <h2 className="text-white">User Name</h2>
      </div>

     {/* Message display  */}
      <div className={`flex-grow  flex-col overflow-y-auto ${style.chatWindowMessages}`}>
      {activeChatMessages.map((message) => {
          const isCurrentUserSender = message.senderId === CURRENT_USER_ID;
          return (
            <div key={message.id} className={`mb-4 ${isCurrentUserSender ? style.messageCurrentUser : style.messageOtherUser}`}>
              <p className="text-white">{message.text}</p>
              <span className="text-gray-400">{message.time}</span>
            </div>
          );
        })}

      </div>
      {/* Message input */}
      <div className="flex-none mt-auto">
      <input className="w-full p-2 rounded" placeholder="Type a message..." />
      </div>
      
    </div>
  );
};

export default ChatWindow;

