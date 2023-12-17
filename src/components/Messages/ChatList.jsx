import React from "react";
import style from "../../style";
import { useState, useEffect } from "react";
import SearchBar from "./searchBar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MdGroupAdd } from "react-icons/md";
import ChannelCreation from "./ChannelCreation.jsx";
import { useSocket } from "../../Socketio.jsx";
import { getHeaders } from "../../jwt_token.jsx";
import SlidingTabBar from './SlidingTabBar.jsx';





const ChatList = ({ activeChat, setActiveChat, onSearch, onIconClick, setActiveChatUser, currentUserToken,onTabSelected }) => {
  const [chats, setChats] = useState([]);
  const [sender_id, setsenderflag] = useState(null);
  const socket = useSocket();

  // const handleTabSelection = (selectedTabId) => {
  //   // Here you will handle switching between DMs and Channels based on the selectedTabId
  // };

  // console.log("server is running");
  useEffect(() => {
    if (socket == null) return;

    socket.emit("request-latest-messages", currentUserToken.id);

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
            senderId: newMessage.senderId,
            receiveravatar: newMessage.receiveravatar,
            senderavatar: newMessage.senderavatar,
            senderflag:newMessage.senderflag,
            receiverflag:newMessage.receiverflag,
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
              senderId: newMessage.senderId,
              receiveravatar: newMessage.receiveravatar,
              senderavatar: newMessage.senderavatar,
              senderflag : newMessage.senderflag,
              receiverflag:newMessage.receiverflag,
            },
          ];
        }

        updatedChats.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        return updatedChats;
      });
    };

    socket.on("new-message", handleNewMessage);

    socket.on("search-user-response", (response) => {
      if (response.chatId) {
        setActiveChat(response.chatId);

        socket.emit("request-messages-for-chat", { chatId: response.chatId });
      } else if (response.error) {
        console.error("Search error:", response.error);
        alert('User Not Found');
      }
    });

    // console.log(chats);
    return () => {
      socket.off("latest-messages");
      socket.off("new-message", handleNewMessage);
      socket.off("search-user-response");
    };
  }, [socket, chats]);




  const handleChatClick = (chatId, chats) => {
    setActiveChat(chatId);
    console.log('Chat ID clicked:', chatId);
    console.log('Chat data:', chats);
    socket.emit("request-messages-for-chat", {
      chatId,
    });
  };

  // const handleTabSelected = (tabId) => {
  //   // Logic to switch between displaying DMs and Channels
  //   if (tabId === 'dms') {
  //     // Set state to show DMs
  //   } else if (tabId === 'channels') {
  //     // Set state to show Channels
  //   }
  // };

  return (
    <div
      className={`w-3/12 flex-grow ${style.sidebarW} ${style.chatListContainer}`}
    >

      <div className="h-5/5 rounded-b-2xl flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`flex items-center p-2 rounded-l-[50px] rounded-r-[20px] ${style.transition
              } hover:bg-opacity-70 rounded-lg shadow-2xl  ${activeChat === chat.id ? style.activeChatItem : ""
              }`}
            onClick={() => handleChatClick(chat.id)}
          >
            {/*! Wrapper div with relative positioning */}
            <div className="relative">
              {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
              <span
                className={`absolute w-12 h-12 rounded-full border-[3px] ${chat.status === "online"
                    ? style.online
                    : chat.status === "offline"
                      ? style.offline
                      : style.inGame
                  }`}
              ></span>
              <img
                className="w-12 h-12 rounded-full "
                src={ chat.senderflag  === currentUserToken.id? chat.receiveravatar : chat.senderavatar}
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
