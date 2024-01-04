const style = {
  backdropBlur: "backdrop-blur-[20px]",
  sidebarW: "w-2/12", // when sidebar is expanded
  sidebarW2: "w-1/12", // when sidebar is collapsed
  contentW: "md:w-10/12 w-full", // when sidebar is expanded
  contentW2: "md:w-11/12 w-full", // when sidebar is collapsed
  barBlueBlur: "bg-bDark_1/30 backdrop-blur-[30px]",
  blueBlur: "bg-bLight_5/20 shadow-4xl backdrop-blur-lg backdrop-filter border-2 \
  border-white border-opacity-[3%]", // component background
  rounded: "rounded-4xl",
  online: "border-org_3 bg-org_3/30", // if user is online
  offline: "border-[#999] bg-[#999]/30", // .. offline
  inGame: "border-bLight_3 bg-bLight_3/30", // .. in game
  boxWidth: "w-11/12 mx-auto",

  //my chat styles
  chatContainer: "flex flex-col h-[calc(100vh-45px)]",
  chatsone: "w-11/12 h-full mx-auto",//!ask the boys about this 
  activeChatItem: "bg-bDark_1",
  // messageCurrentUser: `
  //   text-right bg-blue-0 text-white p-2 rounded-l-lg rounded-tr-lg`,
  // messageOtherUser: `
  //   text-left bg-gray-500 text-white p-2 rounded-r-lg rounded-tl-lg`,
  messageCurrentUser: "bg-[#FFE268] ml-auto text-right p-2 rounded-lg float-right clear-both break-words",
  messageOtherUser: "bg-[#3077A1] text-left p-2 rounded-lg float-left clear-both break-word",
  chatWindowMessages: "flex-1 overflow-y-auto",
  chatListContainer: "flex flex-col overflow-y-auto",
  searchBar: "p-2",


  tabContainer: "w-full flex justify-center items-center bg-bLight_4 p-1/2 rounded-full",
  tabUnderline: "absolute bottom-0 h-full bg-white rounded-full transition-all duration-300",
  
};

export const ImgBg = ({ img }) => ({
  backgroundImage: `url('${img}')`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
});

export default style;
