const style = {
    backdropBlur: "backdrop-blur-[70px]",
    sidebarW: "w-2/50", // when sidebar is expanded
    sidebarW2: "w-1/12", // when sidebar is collapsed
    contentW: "w-10/12 ", // when sidebar is expanded
    contentW2: "w-11/12", // when sidebar is collapsed
    blueBlur: "bg-bDark_1 bg-opacity-60 backdrop-blur-3xl",
    rounded: "rounded-[20px]",
    online: "border-org_3", // if user is online
    offline: "border-[#999]", // .. offline
    inGame: "border-bLight_3", // .. in game
    transition: "transition-all duration-700",
    boxWidth: "w-11/12 mx-auto",
    //my chat styles
    chatContainer: "flex flex-col h-[calc(100vh-45px)]", 
    chatsone : "w-11/11   h-[calc(100vh-45px)] mx-auto",//!ask the boys about this 
    activeChatItem: "bg-bDark_1",
   
    messageCurrentUser: "bg-[#FFE268] text-right p-2 rounded-lg float-right clear-both break-words",
    messageOtherUser: "bg-[#3077A1] text-left p-2 rounded-lg float-left clear-both break-word",
    chatWindowMessages: "flex-1 overflow-y-auto", 
    chatListContainer: "flex flex-col overflow-y-auto", 
    searchBar: "p-2",


    tabContainer: "  w-full flex justify-center items-center bg-bLight_4 p-1/2 rounded-full",
    tabUnderline: "absolute bottom-0 h-full bg-white rounded-full transition-all duration-300",
    tab: "z-10 py-2 px-6 focus:outline-none",
    tabActive: "text-org_2",
    tabInactive: "text-bDark_4",

}


export default style;