import React, { useState, useEffect } from "react";
import style, { ImgBg } from "../../../style";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../../Socketio";
import { Link } from "react-router-dom";
import { icons } from "../../../constants";

const ChatWindow = ({ activeChat, activeChatUser, currentUserToken }: any) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [senderData, setSenderData] = useState({
    image: "",
    username: "",
    inviter: true,
    invited: false,
  } as any);
  
  const socket: any = useSocket();

  const handleSendMessage = () => {
    socket.emit("send-message", {
      chatId: activeChat,
      Content: message,
      senderId: currentUserToken.id,
    });
    setMessage("");
  };

  useEffect(() => {
    if (socket == null) return;

    socket.emit("join-chat", { chatId: activeChat });

    const handleNewMessage = (newMessage: any) => {

      if (newMessage.chatid.id === activeChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage] as any);
      }
    };

    socket.on("new-message", handleNewMessage);

    socket.on("messages-for-chat-response", (chatData: any) => {


      if (chatData.id === activeChat) {
        setMessages(
          (prevMessages) => [...prevMessages, chatData.messages] as any
        );
      }
      if (chatData && Array.isArray(chatData.messages)) {

        setMessages(chatData.messages);
        if (chatData.chatReceiverId === currentUserToken.id) {
          setSenderData(() => ({
            ...senderData,
            image: chatData.senderAvatar,
            username: chatData.senderUsername,
          }));
        } else {
          setSenderData(() => ({
            ...senderData,
            image: chatData.receiverAvatar,
            username: chatData.receiverUsername,
          }));
        }

        const ids = chatData.messages.map((msg: any) => msg.id);
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

    setMessages(sortedMessages);
    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("messages-for-chat-response");
    };
  }, [socket,activeChat]);

  // challenge handeling ---------------------------------------------------------
  const handelChallenge = () => {
    console.log("invite from chat sent to ", senderData.username);
  };

  // accept challenge handeling ---------------------------------------------------------
  const handelAcceptChallenge = () => {
    console.log("invite from chat accepted", senderData.username);
  };

  // cancel challenge handeling ---------------------------------------------------------
  const handelCancelInvitetion = () => {
    console.log("invite from chat canceled", senderData.username);
  };

  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden ${style.blueBlur} ${style.rounded}`}
    >
      {/* Chat header ----------------------------------------------------------------------*/}
      <div className="flex p-2 px-6 gap-4 h-max items-center rounded-t-lg bg-bDark_1/50">
        {/* image ------------------------- */}
        <Link
          to={`/profile/${senderData.username}`}
          style={ImgBg({ img: senderData.image })}
          className="w-12 h-12 rounded-full hover:opacity-80 transition-all duration-300"
        ></Link>
        {/* username -------------------- */}
        <div className="text-bLight_4">@{senderData.username}</div>
        {/* invite to game -------------- */}
        {!senderData.inviter && !senderData.invited ? (
          <div
            onClick={() => handelChallenge()}
            className={`ml-auto p-2 px-4 text-org_1/70 bg-org_3/50 rounded-full border-2 border-org_3/40 
            hover:bg-org_3/70 transition-all duration-300 cursor-pointer`}
          >
            Challenge
          </div>
        ) : senderData.invited ? (
          <div
            onClick={() => handelAcceptChallenge()}
            className={`felx ml-auto p-2 gap-2 text-org_1/70 bg-bDark_4/50 rounded-full border-2 border-org_1/40
            hover:bg-bDark_1/70 transition-all duration-300 cursor-pointer `}
          >
            <div className="w-max">Accept Challenge</div>
          </div>
        ) : (
          <div
            onClick={() => handelCancelInvitetion()}
            className={`ml-auto p-2 px-4 text-org_1/50 bg-org_3/20 rounded-full border-2 border-org_3/20 
            hover:bg-org_3/70 transition-all duration-300 cursor-pointer`}
          >
            Invitetion sent ...
          </div>
        )}
      </div>

      {/* Message display  ----------------------------------------------------------------------*/}
      <div
        className={`flex h-full w-full px-5 flex-col scroll-mb-0 overflow-y-auto`}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p className={`mx-auto mt-5 text-sm text-bLight_4/80`}>
            No messages yet.
          </p>
        ) : (
          messages.map((message: any) => (
            <div
              key={message.id}
              className={`my-2 p-2 rounded-lg w-7/12 relative flex items-center gap-2 align-baseline ${
                message.ReceiverUserID.id === currentUserToken.id
                  ? "text-left p-2 rounded-lg"
                  : "ml-auto text-right p-2 rounded-lg flex-row-reverse"
              }`}
            >
              {/* content ------------------ */}
              <p
                className={`w-max max-w-full text-bLight_2 p-3 whitespace-normal break-words  text-sm rounded-2xl ${
                  message.ReceiverUserID.id === currentUserToken.id
                    ? "bg-org_1/20"
                    : "bg-bLight_5/40"
                }`}
              >
                {message.Content}
              </p>
              {/* Format the timestamp as needed */}
              <span className="text-bLight_5 text-xs">
                {new Date(message.Timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Message input */}
      <div className="flex w-full p-2 px-4">
        <div
          className="w-full mx-auto flex flex-row items-center rounded-full p-2 px-4
                overflow-hidden bg-bDark_3/80 text-sm border-2 border-bLight_5/40 text-bLight_3"
        >
          <input
            className="w-full outline-none bg-transparent placeholder:text-bLight_5"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="text-2xl text-bLight_4"
          >
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
