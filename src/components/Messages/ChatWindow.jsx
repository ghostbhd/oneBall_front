import React, { useState } from 'react';
import style from "../../style";

import { mockMessages } from '/home/hajar/Desktop/front/src/data/mockChats.js';

const ChatWindow = () => {
  return (
    <div className={`w-9/12 ${style.contentW} bg-opacity-60 p-4 flex flex-col`}>
      {/* Chat header */}
      <div className="flex items-center mb-4">
        {/* Placeholder for selected user's avatar and name */}
        <img className="w-12 h-12 rounded-full mr-4" src="path_to_avatar" alt="User Name" />
        <h2 className="text-white">User Name</h2>
      </div>

      {/* Message display */}
      <div className="flex-1 overflow-y-auto mb-4">
        {mockMessages.map((message) => (
          <div key={message.id} className="mb-4">
            <p className="text-white">{message.text}</p>
            <span className="text-gray-400">{message.time}</span>
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

// const ChatWindow = () => {
//   return (
//     <div className={`w-9/12 ${style.contentW} bg-opacity-60 p-4 flex flex-col`}>
//       {/* Chat header */}
//       <div className="flex items-center mb-4">
//         {/* Placeholder for selected user's avatar and name */}
//         <img className="w-12 h-12 rounded-full mr-4" src="path_to_avatar" alt="User Name" />
//         <h2 className="text-white">User Name</h2>
//       </div>

//       {/* Message display */}
//       <div className="flex-1 overflow-y-auto mb-4">
//         {mockMessages.map((message) => (
//           <div key={message.id} className="mb-4">
//             <p className="text-white">{message.text}</p>
//             <span className="text-gray-400">{message.time}</span>
//           </div>
//         ))}
//       </div>

//       {/* Message input */}
//       <div className="mt-auto">
//         <input className="w-full p-2 rounded" placeholder="Type a message..." />
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;