const style = {
    backdropBlur: "backdrop-blur-[70px]",
    sidebarW: "w-2/12", // when sidebar is expanded
    sidebarW2: "w-1/12", // when sidebar is collapsed
    contentW: "md:w-10/12 w-full", // when sidebar is expanded
    contentW2: "md:w-11/12 w-full", // when sidebar is collapsed
    blueBlur: "bg-bDark_1 sm:bg-opacity-60 bg-opacity-30 backdrop-blur-3xl",
    rounded: "rounded-[40px]",
    online: "border-org_3", // if user is online
    offline: "border-[#999]", // .. offline
    inGame: "border-bLight_3", // .. in game
    transition: "transition-all duration-50",
    boxWidth: "w-11/12 mx-auto",
}

export const ImgBg = ({ img }) => ({
    backgroundImage: `url('${img}')`,
    backgroundSize: `cover`,
    backgroundPosition: `center`,
});

export default style;