import React, { useState, useRef, useEffect } from "react";

import style from "../../style";
import { useSocket } from "../../Socketio.jsx";

const SlidingTabBar = ({ onTabSelected,currentUserToken }) => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const socket = useSocket();
  const tab = "py-2 w-1/2 px-6 focus:outline-none";
  const tabActive = "bg-bLight_5/60 rounded-2xl";
  const tabInactive = "bg-transparent rounded-2xl text-bLight_4";
  
  const tabs = [
    {
      id: "dms",
      name: "DMs",
    },
    {
      id: "channels",
      name: "Channels",
    },
  ];

  // useEffect(() => {
  //   if(socket == null) return;  
  //   console.log("*****************************************************888")
  //   socket.emit("request-latest-messages", currentUserToken.id);
  //   }, [socket]);


  return (
    <div className={`w-full flex flex-row items-center text-bLight_2 gap-3`}>
      <button
        ref={(el) => (tabsRef.current[0] = el)}
        className={`${tab} ${
          activeTabIndex === 0 ? tabActive : tabInactive
        }`}
        onClick={() => {
          setActiveTabIndex(0);
          onTabSelected("dms");
        }}
      >
        DMs
      </button>
      <button
        ref={(el) => (tabsRef.current[1] = el)}
        className={`${tab} ${
          activeTabIndex === 1 ? tabActive : tabInactive
        }`}
        onClick={() => {
          setActiveTabIndex(1);
          onTabSelected("channels");
        }}
      >
        Channels
      </button>
    </div>
  );
};

export default SlidingTabBar;
