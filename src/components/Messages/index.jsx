import React from "react";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import style from "../../style";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import ChannelWindow from "./ChannelWindow.jsx";
import ChannelCreation from "./ChannelCreation.jsx";
import { useSocket } from "../../Socketio.jsx";
import { getHeaders } from "../../jwt_token.jsx";
import * as jwtDecode from "jwt-decode";
import SearchBar from "./searchBar.jsx";

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestMessages, setLatestMessages] = useState([]);
  const [showChannelCreation, setShowChannelCreation] = useState(false);

  const token = getHeaders().jwttt;
  const currentUserToken = jwtDecode.jwtDecode(token);
  console.log("current user id is ", currentUserToken.id);

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredChats = latestMessages.filter(
    (chat) =>
      chat.name && chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearchIconClick = () => {
    console.log("Search icon was clicked!");
  };

  const toggleChannelCreationModal = () => {
    setShowChannelCreation(!showChannelCreation);
  };

  const handleSearchSubmit = (value) => {
    console.log("Search submitted for:", value);
  };

  return (
    <div
      className={`flex h-full ${style.chatsone} ${style.rounded} ${style.blueBlur} relative`}
    >
      {" "}
      {/* Add relative here for modal positioning */}
      <ChatList
        currentUserToken={currentUserToken}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        setActiveChatUser={setActiveChatUser}
        chats={filteredChats}
        onSearch={handleSearch}
        onIconClick={toggleChannelCreationModal}
        onSearchSubmit={handleSearchSubmit}
      />
      <ChatWindow
        activeChat={activeChat}
        activeChatUser={activeChatUser}
        currentUserToken={currentUserToken}
      />
      <ChannelWindow
        activeChannel={activeChat}
        currentUserToken={currentUserToken}
        // setActiveChannelMembers={setActiveChannelMembers}
      />
      {showChannelCreation && (
        <ChannelCreation
          onClose={toggleChannelCreationModal}
          currentUserToken={currentUserToken}
        />
      )}
    </div>
  );
};
export default Messages;
