import React, { useState } from 'react';
import style from "../../style";
import { IoIosSend } from "react-icons/io";

import { mockMessages } from '/home/hajar/Desktop/front/src/data/mockChats.js';
// import { send } from 'vite';

const ChatWindow = ({ activeChat }) => {


  const CURRENT_USER_ID = 1;//! This should be the id of the current user
  const activeChatMessages = mockMessages.filter(message => message.chatId === activeChat);


  // State to keep track of the input message
  const [message, setMessage] = useState('');

  // Function to handle message submission
  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would send your message to the backend or your state management
      console.log("Send message:", message);
      // After sending the message, clear the input field
      setMessage('');
    }
  };

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
      <div className="flex items-center mt-auto p-2">
        <input
          className="w-full p-2 rounded-l-lg"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} // Allows sending message with Enter key
        />
        <button 
          onClick={handleSendMessage} 
          className="bg-indigo-300 p-3 rounded-r-lg"
        >
          <IoIosSend />
        </button>
      </div>
      
    </div>
  );
};

export default ChatWindow;

