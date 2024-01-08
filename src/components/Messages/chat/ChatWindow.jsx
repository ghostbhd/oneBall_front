import { useState, useEffect } from "react";
import style from "../../../style";
import { IoIosSend } from "react-icons/io";
import { useSocket } from "../../../Socketio.jsx";
import { Link } from "react-router-dom";

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
      console.log(
        "new message received:================================================",
        newMessage
      );
      if (newMessage.chatid.id === activeChat) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };

    socket.on("new-message", handleNewMessage);

    socket.on("messages-for-chat-response", (chatData) => {
      console.log(
        "new:================================================",
        chatData
      );

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
      // socket.emit("leave-chat", { chatId: activeChat });
    };
  }, [socket]);

  // console.log(`active chat user is ${activeChatUser}`);
  return (
    <div
      className={`w-full h-full relative flex flex-col overflow-hidden ${style.blueBlur} ${style.rounded}`}
    >
      {/* Chat header */}
      <Link
        className="flex flex-row p-4 px-6 h-max items-center rounded-t-lg bg-bDark_1/40"
        to={"/profile/"}
      >
        <img
          className="w-16 h-18  rounded-full  mr-5"
          src={
            activeChatUser?.avatar ||
            "https://i.pinimg.com/236x/7f/61/ef/7f61efa1cfbf210ac8df7a813cf56a1e.jpg"
          }
          alt={activeChatUser?.name || "Default Name"}
        />
        <h2 className="text-black">{activeChatUser?.name || "Default Name"}</h2>
      </Link>

      {/* Message display  ----------------------------------------------------------------------*/}
      <div
        className={`flex h-full w-full px-5 flex-col scroll-mb-0 overflow-y-auto`}
      >
        {Array.isArray(messages) && messages.length === 0 ? (
          <p className={`mx-auto mt-5 text-sm text-bLight_4/80`}>
            No messages yet.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`my-2 p-2 rounded-lg w-7/12 relative flex items-center gap-2 align-baseline ${
                message.ReceiverUserID.id === currentUserToken.id
                  ? "ml-auto text-right p-2 rounded-lg flex-row-reverse"
                  : "text-left p-2 rounded-lg"
              }`}
            >
              {/* content ------------------ */}
              <p
                className={`w-max max-w-full text-bLight_2 p-3 whitespace-normal break-words  text-sm rounded-2xl ${
                  message.ReceiverUserID.id === currentUserToken.id
                    ? "bg-bLight_5/40"
                    : "bg-org_1/20"
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
