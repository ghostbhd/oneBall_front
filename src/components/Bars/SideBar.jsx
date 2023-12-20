import { Link, useLocation } from "react-router-dom";
import { sidebarItems, icons } from "../../constants";
import style from "../../style";

import { useTheme } from "../../themeContext";

const SideBar = () => {
  const location = useLocation();

  const { theme, toggleSidebar } = useTheme();

  return (
    <div
      className={`md:flex hidden h-screen p-4 text-bLight_1 border-r-2 border-bDark_2 shadow-sBar z-20
        ${style.barBlueBlur}
        ${theme.isSidebarCollapsed ? style.sidebarW2 : style.sidebarW}`}
    >
      {/* Toggle button ---------------------- */}
      <div className="absolute top-8 right-2">
        <button onClick={toggleSidebar} className="text-2xl">
          {theme.isSidebarCollapsed === true ? (
            <icons.toRight />
          ) : (
            <icons.toLeft />
          )}
        </button>
      </div>
      {/* Sidebar items ---------------------- */}
      <ul
        className={`flex flex-col space-y-7 lg:space-y-12 w-full items-center justify-center`}
      >
        {/* logo ------------------------ */}
        <li
          className={`text-[25pt] px-4 ${
            theme.isSidebarCollapsed ? "w-max" : "w-full"
          }`}
        >
          <Link to={"/"}>{theme.isSidebarCollapsed ? "Pi" : "PiPo"}</Link>
        </li>
        {/* items ------------------------ */}
        {sidebarItems.map((item, index) => (
          <li
            key={item.title}
            className={`${
              index === sidebarItems.length - 3
                ? "!mb-auto"
                : index === 0
                ? "!mt-auto"
                : ""
            } ${theme.isSidebarCollapsed ? "w-max" : "w-full"}`}
          >
            <Link
              to={item.link}
              className={`flex flex-row p-2 items-center ${
                location.pathname === `${item.link}` || location.pathname === `${item.link}/`
                  ? `bg-org_3 rounded-3xl text-white font-bold`
                  : ""
              }`}
            >
              {/* Icon ---------- */}
              <span
                className={`${
                  theme.isSidebarCollapsed ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"
                }`}
              >
                {<item.icon />}
              </span>

              {/* title ---- */}
              <span
                className={`text-base overflow-hidden w-max ${
                  theme.isSidebarCollapsed ? "hidden" : "ml-8"
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
