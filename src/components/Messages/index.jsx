
// Messages.jsx
import React from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import style from '/home/hajar/Desktop/front/src/style.js';
import { useState, useEffect } from "react";

// const Messages = () => {
//       return (
//       <div className={`flex ${style.boxWidth} ${style.rounded} ${style.blueBlur} overflow-hidden`}>
//         <div className={`flex-none ${style.chatListWidth}`}> {/* Control the width in your style.js */}
//           <ChatList />
//         </div>
//         <div className={`flex-grow ${style.chatWindowFlex}`}>
//           <ChatWindow />
//         </div>
//       </div>
//     );
//   };


const Messages = () => {
  return (
    <div className={`flex ${style.boxWidth} ${style.rounded} ${style.blueBlur} overflow-hidden`}>
      <ChatList />
      <ChatWindow />
    </div>
  );
};
  export default Messages;