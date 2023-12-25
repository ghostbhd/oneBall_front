import React from "react";
import style, { ImgBg } from "../../style";
import { useState, useEffect } from "react";
import SearchBar from "./searchBar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MdGroupAdd } from "react-icons/md";
import ChannelCreation from "./ChannelCreation.jsx";
import { useSocket } from "../../Socketio.jsx";
import { getHeaders } from "../../jwt_token.jsx";
import SlidingTabBar from "./SlidingTabBar.jsx";

const ChatList = ({
  activeChat,
  setActiveChat,
  onSearch,
  onIconClick,
  setActiveChatUser,
  currentUserToken,
  onTabSelected,
}) => {
  const [chats, setChats] = useState([]);
  const [sender_id, setsenderflag] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.emit("request-latest-messages", currentUserToken.id);

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
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            lastMessage: newMessage.content,
            timestamp: newMessage.Timestamp,
            senderId: newMessage.senderId,
            receiveravatar: newMessage.receiveravatar,
            senderavatar: newMessage.senderavatar,
            senderflag: newMessage.senderflag,
            receiverflag: newMessage.receiverflag,
          };
        } else {
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
              senderflag: newMessage.senderflag,
              receiverflag: newMessage.receiverflag,
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
        alert("User Not Found");
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
    console.log("Chat ID clicked:", chatId);
    console.log("Chat data:", chats);
    socket.emit("request-messages-for-chat", {
      chatId,
    });
  };

  return (
    <div className={`h-5/5 w-full flex flex-col overflow-y-auto gap-2`}>
      {chats.map((chat) => (
        // message item -----------------------------
        <div
          key={chat.id}
          className={`flex flex-row items-center rounded-full cursor-pointer  shadow-2xl  ${
            activeChat === chat.id ? "bg-bLight_5/40" : ""
          }`}
          onClick={() => handleChatClick(chat.id)}
        >
          {/* image ----------------------------- */}
          <div
            style={ImgBg({
              img:
                chat.senderflag === currentUserToken.id
                  ? chat.receiveravatar
                  : chat.senderavatar,
            })}
            className={`w-12 h-12 border-4 rounded-full  ${
              chat.status === "online"
                ? style.online
                : chat.status === "offline"
                ? style.offline
                : style.inGame
            }`}
          ></div>
          {/* Status indicator with absolute to place it at the bottom-right corner of the avatar image.*/}
          {/* <span
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
              src={
                chat.senderflag === currentUserToken.id
                  ? chat.receiveravatar
                  : chat.senderavatar
              }
              alt={`${chat.name}`}
            /> */}
          <div className="flex flex-col text-sm">
            <p className="text-bLight_4 px-3">@{chat.name}</p>
            <p className="text-bLight_2 px-3">{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
