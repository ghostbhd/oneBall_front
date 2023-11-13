const style = {
    backdropBlur: "backdrop-blur-[70px]",
    sidebarW: "w-2/12", // when sidebar is expanded
    sidebarW2: "w-1/12", // when sidebar is collapsed
    contentW: "w-10/12", // when sidebar is expanded
    contentW2: "w-11/12", // when sidebar is collapsed
    blueBlur: "bg-bDark_1 bg-opacity-60 backdrop-blur-3xl",
    rounded: "rounded-[20px]",
    online: "border-org_3", // if user is online
    offline: "border-[#999]", // .. offline
    inGame: "border-bLight_3", // .. in game
    transition: "transition-all duration-700",
    boxWidth: "w-11/12 mx-auto",
    //my chat styles
    chatsone : "w-11/13 mx-auto",
    activeChatItem: "bg-bDark_1",
    messageCurrentUser: `
      text-right bg-blue-0 text-white p-2 rounded-l-lg rounded-tr-lg`,
    messageOtherUser: `
      text-left bg-gray-500 text-white p-2 rounded-r-lg rounded-tl-lg`,
    messageCurrentUser: "bg-[#FFE268] text-right p-2 rounded-lg float-right clear-both break-words",
    messageOtherUser: "bg-[#3077A1] text-left p-2 rounded-lg float-left clear-both break-word",

  
}

// searc about mx-auto
export default style;