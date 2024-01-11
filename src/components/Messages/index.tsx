import ChatList from "./chat/ChatList";
import ChatWindow from "./chat/ChatWindow";

import ChannelWindow from "./channel/ChannelWindow";
import ChannelCreation from "./channel/ChannelCreation";
import ChannelList from "./channel/ChannelList";

import React, { useState, useEffect } from "react";
import { GetHeaders } from "../../jwt_token";
import * as jwtDecode from "jwt-decode";
import SearchBar from "./searchBar";
import SlidingTabBar from "./SlidingTabBar";
import style from "../../style";
import { useSocket } from "../../Socketio";

const Messages = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [latestMessages, setLatestMessages] = useState([]);
  const [showChannelCreation, setShowChannelCreation] = useState(false);
  const [activeTab, setActiveTab] = useState("dms");
  const [activeChannel, setActiveChannel] = useState(null);
  const [typeOfChannel, setTypeOfChannel] = useState("");

  const socket: any = useSocket();

  const handleSearchSubmit = (searchTerm) => {
    // if (searchTerm.trim()) {
    //   socket.emit("search-user", {
    //     username: searchTerm,
    //     currentUserId: currentUserToken.id,
    //   });
    // }
  };

  const handleTabSelected = (tabId :any) => {
    if (socket == null) return;
    console.log("*****************************************************888");
    socket.emit("request-latest-messages", currentUserToken.id);

    setActiveTab(tabId);
  };
  var currentUserToken :any;
  const token : any = GetHeaders().jwttt as any;
  if (token) {
    currentUserToken  = jwtDecode.jwtDecode(token) as any;
  } else {
    currentUserToken = null;
  }
  if (socket == null) return;
  socket.emit("request-latest-messages", currentUserToken.id);

  // useEffect(() => {
  // }, [socket]);

  const handleSearch = (query : any) => {
    setSearchTerm(query);
  };

  const filteredChats = latestMessages.filter(
    (chat : any) =>
      chat.name && chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleChannelCreationModal = () => {
    setShowChannelCreation(!showChannelCreation);
  };

  return (
    <div
      className={`flex w-full h-full gap-2 ${style.chatsone} ${style.rounded} p-6 pb-14 md:pb-6 md:pt-14`}
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
          <SlidingTabBar
            onTabSelected={handleTabSelected}
            currentUserToken={currentUserToken}
          />
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
          <ChannelWindow
            typeOfChannel={typeOfChannel}
            activeChannel={activeChannel}
            currentUserToken={currentUserToken}
          />
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
