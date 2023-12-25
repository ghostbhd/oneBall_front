// import React, { useState } from 'react';
// import style from "../../style";
// import { IoIosSend } from "react-icons/io";

// import { mockMessages } from '/home/hajar/Desktop/front/src/data/mockChats.js';
// // import { send } from 'vite';

// interface ChatWindowProps {
//   activeChat: number | null;
// }

// const ChatWindow: React.FC<ChatWindowProps> = ({ activeChat }) => {
//   const CURRENT_USER_ID = 1; // This should probably come from props or context
//   const activeChatMessages = mockMessages.filter(message => message.chatId === activeChat);

//   // Use TypeScript generics to specify the type of state
//   const [message, setMessage] = useState<string>('');

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       console.log("Send message:", message);
//       // Here you would typically send the message to your server
//       setMessage('');
//     }
//   };

//   return (
//     <div className={`w-9/12 ${style.contentW} ${style.chatContainer}`}>
//       {/* Chat header */}
//       <div className="flex  h-20 items-center bg-bDark_1 mb-5">

//         <img className="w-16 h-18  rounded-full  mr-5" src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg" alt="User Name" />
//         <h2 className="text-black">User Name</h2>
//       </div>

//      {/* Message display  */}
//       <div className={`flex-grow  flex-col overflow-y-auto ${style.chatWindowMessages}`}>
//       {activeChatMessages.map((message) => {
//           const isCurrentUserSender = message.senderId === CURRENT_USER_ID;
//           return (
//             <div key={message.id} className={`mb-4 ${isCurrentUserSender ? style.messageCurrentUser : style.messageOtherUser}`}>
//               <p className="text-white">{message.text}</p>
//               <span className="text-gray-400">{message.time}</span>
//             </div>
//           );
//         })}

//       </div>
//       {/* Message input */}
//       <div className="flex items-center mt-auto p-2">
//         <input
//           className="w-full p-2 rounded-l-lg"
//           placeholder="Type a message..."
//           value={message}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
//           onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
//         />
//         <button 
//           onClick={handleSendMessage} 
//           className="bg-indigo-300 p-3 rounded-r-lg"
//         >
//           <IoIosSend />
//         </button>
//       </div>
      
//     </div>
//   );
// };

// export default ChatWindow;
