// Sidebar icons
import {MdSpaceDashboard} from 'react-icons/md'; // dashboard icon
import {FaUser} from 'react-icons/fa'; // profile icon
import {IoGameController} from 'react-icons/io5'; // games icon
import {BiSolidMessageDetail} from 'react-icons/bi'; // messages icon
import {ImStatsDots} from 'react-icons/im'; // stats icon
import {MdSettings} from 'react-icons/md'; // settings icon
import {TbLogout} from 'react-icons/tb'; // logout icon

//other icons
import {FaAngleRight} from 'react-icons/fa'; // arrow icon
import {BiSolidArrowToRight, BiSolidArrowFromRight} from 'react-icons/bi'; // arrow icon
import {FaUserFriends} from 'react-icons/fa'; // friends icon
import {FaRandom} from 'react-icons/fa'; // random icon
import {BsFillStarFill} from 'react-icons/bs'; // star icon

export const sidebarItems = [
    {
        icon: MdSpaceDashboard ,
        title: 'Dashboard',
        link: '/'
    },
    {
        icon: FaUser,
        title: 'Profile',
        link: '/profile'
    },
    {
        icon: IoGameController,
        title: 'Games',
        link: '/games'
    },
    {
        icon: BiSolidMessageDetail,
        title: 'Messages',
        link: '/messages'
    },
    {
        icon: ImStatsDots,
        title: 'Stats',
        link: '/stats'
    },
    {
        icon: MdSettings,
        title: 'Settings',
        link: '/settings'
    },
    {
        icon: TbLogout,
        title: 'Logout',
        link: '/logout'
    },

];

export const icons = {
    toRight: FaAngleRight,
    arrowRight: BiSolidArrowToRight,
    arrowLeft: BiSolidArrowFromRight,
    friends: FaUserFriends,
    random: FaRandom,
    star: BsFillStarFill,
}