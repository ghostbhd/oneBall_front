const style = {
  backdropBlur: "backdrop-blur-[30px]",
  sidebarW: "w-2/12", // when sidebar is expanded
  sidebarW2: "w-1/12", // when sidebar is collapsed
  contentW: "md:w-10/12 w-full", // when sidebar is expanded
  contentW2: "md:w-11/12 w-full", // when sidebar is collapsed
  barBlueBlur: "bg-bDark_1/30 backdrop-blur-[30px]",
  blueBlur: "bg-bDark_2/30 shadow-4xl backdrop-blur-2xl backdrop-filter", // component background
  rounded: "rounded-4xl",
  online: "border-org_3 bg-org_3/30", // if user is online
  offline: "border-[#999] bg-[#999]/30", // .. offline
  inGame: "border-bLight_3 bg-bLight_3/30", // .. in game
  boxWidth: "w-11/12 mx-auto",
};

export const ImgBg = ({ img }) => ({
  backgroundImage: `url('${img}')`,
  backgroundSize: `cover`,
  backgroundPosition: `center`,
});

export default style;
