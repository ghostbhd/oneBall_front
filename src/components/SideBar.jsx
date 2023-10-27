import { Link, useLocation } from "react-router-dom";
import { sidebarItems } from "../constants";
import style from "../style";
import { icons } from "../constants";

import { useTheme } from "../themeContext";

const SideBar = () => {
  const location = useLocation();

  const { theme, toggleSidebar } = useTheme();

  return (
    <div
      className={`${style.blueBlur} flex h-screen 
        ${
          theme.isSidebarCollapsed ? style.sidebarW2 : style.sidebarW
        } p-4 text-blue_light_1
        transition-all duration-500`}
    >
      {/* Toggle button ---------------------- */}
      <div className="absolute top-16 right-0">
        <button onClick={toggleSidebar} className="text-3xl">
          {theme.isSidebarCollapsed === true ? (
            <icons.arrowRight />
          ) : (
            <icons.arrowLeft />
          )}
        </button>
      </div>
      {/* Sidebar items ---------------------- */}
      <ul className="flex flex-col space-y-7 w-full">
        {/* logo ------------------------ */}
        <li className="text-[25pt] px-4">
          <Link to={"/"}>{theme.isSidebarCollapsed ? 'Pi' : 'PiPo'}</Link>
        </li>
        {/* items ------------------------ */}
        {sidebarItems.map((item, index) => (
          <li
            key={item.title}
            className={`w-full ${
              index === sidebarItems.length - 3
                ? "!mb-auto"
                : index === 0
                ? "!mt-auto"
                : ""
            }`}
          >
            <Link
              to={item.link}
              className={`flex flex-row items-center p-2 ${
                location.pathname === `${item.link}`
                  ? `bg-orange_3 rounded-3xl text-white`
                  : ""
              } ${
                theme.isSidebarCollapsed
                  ? "justify-center"
                  : ""
              } `}
            >
              {/* Icon / title -------------------------------- */}
              <span className="text-xl">{<item.icon />}</span>
              <span
                className={`text-base ${
                  theme.isSidebarCollapsed ? "hidden" : "ml-6"
                }`}
              >
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
