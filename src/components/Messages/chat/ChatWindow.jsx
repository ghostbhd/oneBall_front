import { useState, useEffect } from "react";
import style from "../../../style";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../../Socketio.jsx";
import {Link} from "react-router-dom";
 
const ChatWindow = ({ activeChat, activeChatUser, currentUserToken }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  // const [Avatar, setUseravatar] = useState(null);
  // const [username, setUsername] = useState(null);


  const socket = useSocket();


  const handleSendMessage = () => {

    // if (message.trim()) {
      // const newMessage = {}

      //   Content: message,
      //   Timestamp: new Date().toISOString(),
      //   senderId: currentUserToken.id,
      //   chatId: activeChat,

      // // };
      // console.log('Sending message:', newMessage);
      // setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit("send-message", {
        chatId: activeChat,
        Content: message,
        senderId: currentUserToken.id,

      });
      setMessage("");
    // }
  };

  useEffect(() => {
    if (socket == null) return;

    socket.emit("join-chat", { chatId: activeChat });
    console.log(`active chat is ${activeChat}`);




    const handleNewMessage = (newMessage) => {
      console.log("new message received:================================================", newMessage);
      if (newMessage.chatid.id === activeChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("new-message", handleNewMessage);

    socket.on("messages-for-chat-response", (chatData) => {
      console.log("new:================================================", chatData);
      

      if (chatData.id === activeChat) {
        setMessages((prevMessages) => [...prevMessages, chatData.messages]);
      }
      if (chatData && Array.isArray(chatData.messages)) {
        console.log("Chat data received:", chatData);



        setMessages(chatData.messages);

        const ids = chatData.messages.map((msg) => msg.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
          console.error("Non-unique IDs detected", ids);
        }
      } else {
        console.error("Incorrect chat data format received:", chatData);
      }
    });

    const sortedMessages = [...messages].sort(
      
      (a, b) => new Date(a.Timestamp) - new Date(b.Timestamp)
      
      );
      console.log("#################### ", sortedMessages);

      setMessages(sortedMessages);
    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("messages-for-chat-response");
      socket.emit("leave-chat", { chatId: activeChat });
    };
    
  }, [activeChat, socket]);
  



  console.log(`active chat user is ${activeChatUser}`);
  return (
    <div className={`w-full  ${style.contentW} ${style.chatContainer}`}>
      {/* Chat header */}
      <Link className="flex  h-20 items-center rounded-t-lg bg-bDark_1 mb-5" to={"/profile/"}>
        <img
          className="w-16 h-18  rounded-full  mr-5"
          src={activeChatUser?.avatar || "https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"}
          alt={activeChatUser?.name || "Default Name"}
        />
        <h2 className="text-black">{activeChatUser?.name || "Default Name"}</h2>
      </Link>

      {/* Message display  ----------------------------------------------------------------------*/}
      <div
        className={`flex-grow px-5 flex-col overflow-y-auto ${style.chatWindowMessages}`}
      >
        {messages.map((message) => {
          {/*!AYOUB update the message.senderId line 117*/}
          return (
            <div
              key={message.id}
              className={`mb-5 ${message.ReceiverUserID.id === currentUserToken.id
                ? style.messageOtherUser
                  : style.messageCurrentUser
                }`}
            >
              <p className="text-white">{message.Content}</p>
              {/* Format the timestamp as needed */}
              <span className="text-gray-400">
                {new Date(message.Timestamp).toLocaleTimeString()}
              </span>
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
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
