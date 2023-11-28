import React from "react";
import style from "../../style";
import { useState, useEffect } from "react";
import SearchBar from "./searchBar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MdGroupAdd } from "react-icons/md";
import ChannelCreation from "./ChannelCreation.jsx";
import { useSocket } from "../../Socketio.jsx";

const CURRENT_USER_ID = 1;

const ChatList = ({ activeChat, setActiveChat, onSearch, onIconClick }) => {
  const [chats, setChats] = useState([]);

  const socket = useSocket();
  // console.log("server is running");
  useEffect(() => {
    if (socket == null) return;

    socket.emit("request-latest-messages", CURRENT_USER_ID);

    // Listening for latest messages
    socket.on("latest-messages", (chatsFromServer) => {
      let sortedChats = chatsFromServer.sort((a, b) => {
        return (
          new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp)
        );
      });
      sortedChats = sortedChats.reverse();
      setChats(sortedChats);
    });
    const handleNewMessage = (newMessage) => {
      setChats((prevChats) => {
        let updatedChats = [...prevChats];

        const chatIndex = updatedChats.findIndex(
          (chat) => chat.id === newMessage.chatId
        );

        if (chatIndex > -1) {
          // Update last message and timestamp for existing chat
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            lastMessage: newMessage.content,
            timestamp: newMessage.Timestamp,
          };
        } else {
          // Add new chat if it doesn't exist
          updatedChats = [
            ...updatedChats,
            {
              id: newMessage.chatId,
              name: `User ${newMessage.senderId}`,
              lastMessage: newMessage.content,
              timestamp: newMessage.Timestamp,
            },
          ];
        }

        // Sort chats based on the timestamp
        updatedChats.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        return updatedChats;
      });
    };

    socket.on("new-message", handleNewMessage);

    // Cleanup on component unmount
    return () => {
      socket.off("latest-messages");
      // console.log(`chat`, chats);
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, chats]);

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
    socket.emit("request-messages-for-chat", {
      chatId,
    });
  };

  return (
    <div
      className={`w-3/12 flex-grow ${style.sidebarW} ${style.chatListContainer}`}
    >
      <div className={style.searchBar}>
        <SearchBar onSearch={onSearch} onChannelIconClick={onIconClick} />
      </div>
      <div className="h-5/5 rounded-b-2xl flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-2 ${
              style.transition
            } hover:bg-opacity-70 ${
              activeChat === chat.id ? style.activeChatItem : ""
            }`}
            onClick={() => handleChatClick(chat.id)}
          >
            {/*! Wrapper div with relative positioning */}
            <div className="relative">
              {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
              <span
                className={`absolute w-12 h-12 rounded-full border-[3px] ${
                  chat.status === "online"
                    ? style.online
                    : chat.status === "offline"
                    ? style.offline
                    : style.inGame
                }`}
              ></span>
              <img
                className="w-12 h-12 rounded-full "
                src="https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"
                alt={`${chat.name}`}
              />
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
