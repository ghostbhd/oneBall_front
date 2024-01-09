// Sidebar icons
import { MdSpaceDashboard } from "react-icons/md"; // dashboard icon
import { FaUser } from "react-icons/fa"; // profile icon
import { IoGameController } from "react-icons/io5"; // games icon
import { BiSolidMessageDetail } from "react-icons/bi"; // messages icon
import { ImStatsDots } from "react-icons/im"; // stats icon
import { MdSettings } from "react-icons/md"; // settings icon
import { TbLogout } from "react-icons/tb"; // logout icon

//other icons
import { FaAngleRight, FaAngleUp, FaAngleDown, FaAngleLeft } from "react-icons/fa"; // arrow icon
import { BiSolidArrowToRight, BiSolidArrowFromRight } from "react-icons/bi"; // arrow from icon
import { FaUserFriends } from "react-icons/fa"; // friends icon
import { FaRandom } from "react-icons/fa"; // random icon
import { BsFillStarFill } from "react-icons/bs"; // star icon
import { FaCheck, FaXmark } from "react-icons/fa6"; // check and X icon
import { IoNotifications } from "react-icons/io5"; // notifications icon

import { BsChevronRight, BsChevronLeft } from "react-icons/bs"; // chevron icon
import { MdOutlineAdd } from "react-icons/md"; // add icon
import { MdGamepad } from "react-icons/md"; // gamepad icon
import { IoPersonRemoveSharp, IoPersonAddSharp } from "react-icons/io5"; // remove/add person icon
import { TbMessagePlus } from "react-icons/tb"; // send message icon
import { MdBlockFlipped } from "react-icons/md"; // block icon
import { MdPersonAddDisabled } from "react-icons/md"; // cancel request icon
import { TiThMenu } from "react-icons/ti"; // menu icon
import { FcGoogle } from "react-icons/fc"; // google icon
import { FaUserClock } from "react-icons/fa"; // friend waiting icon
import { IoPlay } from "react-icons/io5"; // play icon
import { MdCancel } from "react-icons/md"; // stop icon
import { CgSearch } from "react-icons/cg"; // search icon

import FortyTwo  from '../assets/42.svg'; // 42 logo

// for chat --------------------------------------------------
import { IoSearchSharp } from "react-icons/io5"; // search icon
import { MdOutlineMoreVert } from "react-icons/md"; // more icon
import { IoIosSend } from "react-icons/io"; // send icon
import { FaVolumeXmark } from "react-icons/fa6"; // volume mute icon
import { FaVolumeHigh } from "react-icons/fa6"; // volume unmute icon
import { MdDelete } from "react-icons/md"; // delete icon

// import { HiBan } from "react-icons/hi"; // ban icon
// import { TbUserPlus } from "react-icons/tb"; // unban icon
import { ImUserMinus } from "react-icons/im"; // ban icon
import { ImUserPlus } from "react-icons/im"; // unban icon

import { FaCrown } from "react-icons/fa"; // owner icon
import { MdAdminPanelSettings } from "react-icons/md"; // admin icon
import { FaLock } from "react-icons/fa6"; // lock icon




export const sidebarItems = [ // From med to lg screens
  {
    icon: MdSpaceDashboard,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: FaUser,
    title: "Profile",
    link: "/profile",
  },
  {
    icon: IoGameController,
    title: "Games",
    link: "/games",
  },
  {
    icon: BiSolidMessageDetail,
    title: "Messages",
    link: "/messages",
  },
  {
    icon: ImStatsDots,
    title: "Stats",
    link: "/stats",
  },
  {
    icon: MdSettings,
    title: "Settings",
    link: "/settings",
  }
];

export const phoneBottomBar = [ // Responsive bottom bar
  {
    icon: MdSpaceDashboard,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: BiSolidMessageDetail,
    title: "Messages",
    link: "/messages",
  },
  {
    icon: IoGameController,
    title: "Games",
    link: "/games",
  },
  {
    icon: ImStatsDots,
    title: "Stats",
    link: "/stats",
  },
  {
    icon: FaUser,
    title: "Profile",
    link: "/profile",
  },
];

export const phoneNavBar = [
  {
    icon: MdSettings,
    title: "Settings",
    link: "/settings",
  },
  {
    icon: TbLogout,
    title: "Logout",
    link: "/logout",
  },
];

export const icons = { // All needed icons
  logout : TbLogout,
  toRight: FaAngleRight,
  toLeft: FaAngleLeft,
  arrowRight: BiSolidArrowToRight,
  arrowLeft: BiSolidArrowFromRight,
  friends: FaUserFriends,
  random: FaRandom,
  star: BsFillStarFill,
  check: FaCheck,
  xmark: FaXmark,
  up: FaAngleUp,
  down: FaAngleDown,
  notifications: IoNotifications,
  chevronRight: BsChevronRight,
  chevronLeft: BsChevronLeft,
  add: MdOutlineAdd,
  gameController: MdGamepad,
  addPerson: IoPersonAddSharp,
  removePerson: IoPersonRemoveSharp,
  cancelRequest: MdPersonAddDisabled,
  sendMessage: TbMessagePlus,
  block: MdBlockFlipped,
  menu: TiThMenu,
  google: FcGoogle,
  fortyTwo: FortyTwo,
  friendWaiting: FaUserClock,
  play: IoPlay,
  stop: MdCancel,
  search: CgSearch,
};

export const chatIcons = {
  searsh : IoSearchSharp,
  more : MdOutlineMoreVert,
  send : IoIosSend,
  // channel members ----------------
  mute : FaVolumeXmark,
  unmute : FaVolumeHigh,
  kick : MdDelete,
  ban : MdBlockFlipped,
  unban : ImUserPlus,
  owner : FaCrown,
  admin : MdAdminPanelSettings,
  lock : FaLock,
};
