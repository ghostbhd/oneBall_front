import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../constants";
import style from "../style";

const SideBar = () => {
  const location = useLocation();

  return (
    <div className={`${style.backdropBlur} overflow-y-hidden sidebar flex h-screen ${style.sidebarW} p-4 bg-blue_dark_1 bg-opacity-50 text-blue_light_1`}>
      <ul className="flex flex-col space-y-8 w-full">
        <li className="text-[25pt] px-4"><Link to={'/'}>PiPo</Link></li>
        {sidebarItems.map((item, index) => (
          <li
            key={item.title}
            className={`w-full ${index === sidebarItems.length - 3 ? '!mb-auto' : index === 0 ? '!mt-auto' : ''}` }
          >
            <Link
              to={item.link}
              className={`flex items-center px-4 py-2 ${
                location.pathname === `${item.link}`
                  ? `bg-orange_3 rounded-3xl text-white`
                  : ""
              }`}
            >
              <span className="mr-10 text-xl">{<item.icon />}</span>
              <span className="text-base ">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
