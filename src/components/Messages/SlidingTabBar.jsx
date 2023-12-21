import React, { useState, useRef, useEffect } from 'react';

import style from '../../style'; 



const SlidingTabBar = ({ onTabSelected }) => {
  const tabsRef = useRef([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);



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


  return (
    <div className={style.tabContainer}>
      
      <button
        ref={(el) => tabsRef.current[0] = el}
        className={`${style.tab} ${activeTabIndex === 0 ? style.tabActive : style.tabInactive}`}
        onClick={() => {
          setActiveTabIndex(0);
          onTabSelected('dms');
        }}
      >
        DMs
      </button>
      <button
        ref={(el) => tabsRef.current[1] = el}
        className={`${style.tab} ${activeTabIndex === 1 ? style.tabActive : style.tabInactive}`}
        onClick={() => {
          setActiveTabIndex(1);
          onTabSelected('channels');
        }}
      >
        Channels
      </button>
    </div>
  );
};

export default SlidingTabBar;
