import React from "react";
import ChatList from "./ChatList.jsx";
import ChatWindow from "./ChatWindow.jsx";
import style from "../../style";
import { useState, useEffect } from "react";
import ChannelWindow from "./ChannelWindow.jsx";
import ChannelCreation from "./ChannelCreation.jsx";
import { getHeaders } from "../../jwt_token.jsx";
import * as jwtDecode from "jwt-decode";
import SearchBar from "./searchBar.jsx";
import SlidingTabBar from "./SlidingTabBar.jsx";
import ChannelList from "./ChannelList.jsx";
import { useSocket } from "../../Socketio.jsx";

const Messages = (onSearch, onIconClick, onTabSelected) => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestMessages, setLatestMessages] = useState([]);
  const [showChannelCreation, setShowChannelCreation] = useState(false);
  const [activeTab, setActiveTab] = useState("dms");
  const [activeChannel, setActiveChannel] = useState(null);
  const [typeOfChannel, setTypeOfChannel] = useState("");
  const socket = useSocket();

  // const [WindowAvatar, setWindowAvatar] = useState(null);

  const handleSearchSubmit = (searchTerm) => {
    if (searchTerm.trim()) {
      socket.emit("search-user", {
        username: searchTerm,
        currentUserId: currentUserToken.id,
      });
    }
  };

  const handleTabSelected = (tabId) => {
    setActiveTab(tabId);
  };
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

  const toggleChannelCreationModal = () => {
    setShowChannelCreation(!showChannelCreation);
  };

  return (
    <div
      className={`flex w-full h-full gap-2 ${style.chatsone} ${style.rounded} md:p-6 pb-12 px-2 pt-0 `}
    >
      {/* chat sideBar ############################################################### */}
      <div className={`w-3/12 ${style.sidebarW} ${style.chatListContainer}`}>
        {/* SlidingBar - chatList - channelList --------------------------------- */}
        <div
          className={`h-full w-full flex flex-col overflow-hidden p-2 gap-2 ${style.blueBlur} ${style.rounded}`}
        >
          <SearchBar
            onSearch={handleSearch}
            onChannelIconClick={toggleChannelCreationModal}
            currentUserToken={currentUserToken}
            onSearchSubmit={handleSearchSubmit}
          />
          <SlidingTabBar onTabSelected={handleTabSelected} />
          {activeTab === "dms" ? (
            <ChatList
              currentUserToken={currentUserToken}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              setActiveChatUser={setActiveChatUser}
              chats={filteredChats}
              // WindowAvatar={SetWindowAvatar}
            />
          ) : (
            <ChannelList
              typeOfChannel={typeOfChannel}
              setTypeOfChannel={setTypeOfChannel}
              currentUserToken={currentUserToken}
              setActiveChannel={setActiveChannel}
            />
          )}
        </div>
      </div>

      {/* chat window ############################################################### */}
      <div className={`w-9/12 flex`}>
        {activeChat && activeTab === "dms" ? (
          <ChatWindow
            activeChat={activeChat}
            activeChatUser={activeChatUser}
            currentUserToken={currentUserToken}
          />
        ) : activeChannel && activeTab === "channels" ? (
          typeOfChannel === "protected" ? (
            <div></div>
          ):(
          <ChannelWindow
            typeOfChannel={typeOfChannel}
            activeChannel={activeChannel}
            currentUserToken={currentUserToken}
          />
          )
        ) : null}
      </div>

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
