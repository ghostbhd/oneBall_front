import { Link, useLocation } from "react-router-dom";
import { sidebarItems, icons } from "../../constants";
import style from "../../style";

import { useTheme } from "../../themeContext";

const SideBar = () => {
  const location = useLocation();

  const { theme, toggleSidebar } = useTheme();

  return (
    <div
      className={`md:flex hidden h-screen p-4 text-bLight_1 border-r-2 border-bDark_2 shadow-sBar z-50
        ${style.blueBlur} ${style.transition}
        ${theme.isSidebarCollapsed ? style.sidebarW2 : style.sidebarW}`}
    >
      {/* Toggle button ---------------------- */}
      <div className="absolute bottom-36 right-0">
        <button
          onClick={toggleSidebar}
          className="text-3xl bg-[#0f2939] rounded-l-full"
        >
          {theme.isSidebarCollapsed === true ? (
            <icons.arrowRight />
          ) : (
            <icons.arrowLeft />
          )}
        </button>
      </div>
      {/* Sidebar items ---------------------- */}
      <ul
        className={`flex flex-col space-y-7 w-full ${
          theme.isSidebarCollapsed ? "items-center" : ""
        }`}
      >
        {/* logo ------------------------ */}
        <li className="text-[25pt] px-4">
          <Link to={"/"}>{theme.isSidebarCollapsed ? "Pi" : "PiPo"}</Link>
        </li>
        {/* items ------------------------ */}
        {sidebarItems.map((item, index) => (
          <li
            key={item.title}
            className={` ${
              index === sidebarItems.length - 3
                ? "!mb-auto"
                : index === 0
                ? "!mt-auto"
                : ""
            } ${
              theme.isSidebarCollapsed ? "flex w-max justify-center" : "w-full"
            }`}
          >
            <Link
              to={item.link}
              className={`flex flex-row p-2  hover:text-white transition-colors duration-300 ${
                location.pathname === `${item.link}`
                  ? `bg-org_3 rounded-3xl text-white`
                  : ""
              } ${
                theme.isSidebarCollapsed ? "rounded-full justify-center" : ""
              } `}
            >
              {/* Icon / title -------------------------------- */}
              <span
                className={`${
                  theme.isSidebarCollapsed ? "text-2xl" : "text-xl"
                }`}
              >
                {<item.icon />}
              </span>
              <span
                className={`text-base ${
                  theme.isSidebarCollapsed ? "hidden" : "ml-10"
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
