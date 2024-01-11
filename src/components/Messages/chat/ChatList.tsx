import style, { ImgBg } from "../../../style";
import { useState, useEffect } from "react";
import { useSocket } from "../../../Socketio";
import PropTypes from "prop-types";

const ChatList = ({
  activeChat,
  setActiveChat,
  currentUserToken,
  onTabSelected,
}) => {
  const [chats, setChats] = useState([]);
  const [sender_id, setsenderflag] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket == null) return;

    socket.on("latest-messages", (chatsFromServer) => {
      let sortedChats = chatsFromServer.sort((a, b) => {
        return (
          new Date(b.lastMessage.Timestamp) - new Date(a.lastMessage.Timestamp)
        );
      });
      sortedChats = sortedChats.reverse();
      setChats(sortedChats);
    });

    const handleNewMessage = (newMessage) => {
      setChats((prevChats) => {
        let updatedChats = [...prevChats];
        const chatIndex = updatedChats.findIndex(
          (chat) => chat.id === newMessage.chatid.id
        );

        if (chatIndex > -1) {
          updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            lastMessage: newMessage.content,
            Timestamp: newMessage.Timestamp,
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
              id: newMessage.chatid.id,
              name: `User ${newMessage.senderId}`,
              lastMessage: newMessage.content,
              Timestamp: newMessage.Timestamp,
              senderId: newMessage.senderId,
              receiveravatar: newMessage.receiveravatar,
              senderavatar: newMessage.senderavatar,
              senderflag: newMessage.senderflag,
              receiverflag: newMessage.receiverflag,
            },
          ];
        }

        updatedChats.sort(
          (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
        );

        return updatedChats;
      });
    };

    // socket.on("new-message", handleNewMessage);

    socket.on("search-user-response", (response) => {
      if (response.chatId) {
        setActiveChat(response.chatId);

        socket.emit("request-messages-for-chat", {
          chatId: response.chatId,
          sender_id: currentUserToken.id,
        });
      } else if (response.error) {
        console.error("Search error:", response.error);
        alert("User Not Found");
      }
    });

    return () => {
      socket.off("latest-messages");
      socket.off("search-user-response");
    };
  }, [socket]);

  const handleChatClick = (chatId) => {

    setActiveChat(chatId);
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
          <div className="flex w-9/12 flex-col text-sm">
            <p className="text-bLight_4 px-3">@{chat.name}</p>
            <p className="text-bLight_2 px-3 w-full truncate">
              {chat.lastMessage.Content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

ChatList.propTypes = {
  activeChat: PropTypes.number,
  setActiveChat: PropTypes.func,
  currentUserToken: PropTypes.object,
  onTabSelected: PropTypes.func,
};

export default ChatList;
