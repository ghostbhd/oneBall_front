import { Link, useLocation, useNavigate } from "react-router-dom";
import { sidebarItems, icons } from "../../constants";
import style from "../../style";
import { useSocket } from "../../Socketio";

import { useTheme } from "../../themeContext";
import Cookies from "js-cookie";
import { useEffect } from "react";

import * as jwtDecode from "jwt-decode";
import { getHeaders } from "../../jwt_token";

const SideBar = () => {
  const location = useLocation();
  const history = useNavigate();
  const socket = useSocket();
  const handleRedirect = (url) => {
    history(url);
  };
  var username = "";

  const token = getHeaders().jwttt;
  if (token === undefined)
  {
    handleRedirect("/Auth");
    console.log("token undefined");
  }
  else
  {

    const decoded = jwtDecode.jwtDecode(token);
    username = decoded.name;
  }

  const { theme, toggleSidebar } = useTheme();

  const handelDesconnect = () => {
    socket.emit("deconnect", username);
  };

  useEffect(() => {
    socket.on("deconnected", (ok) => {
      if (ok === "ok") {
        Cookies.remove("accessToken");
        socket.disconnect();
        handleRedirect("/Auth");
      }
    });

    return () => {
      socket.off("deconnect");
    };
  }, []);

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
        className={`flex flex-col space-y-7 xl:space-y-12 w-full items-center justify-center`}
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
              index === sidebarItems.length - 2
                ? "!mb-auto"
                : index === 0
                ? "!mt-auto"
                : ""
            } ${theme.isSidebarCollapsed ? "w-max" : "w-full"}`}
          >
            <Link
              to={item.link}
              className={`flex flex-row p-2 items-center ${
                location.pathname === `${item.link}` ||
                location.pathname === `${item.link}/`
                  ? `bg-org_3 rounded-3xl text-white font-bold`
                  : ""
              }`}
            >
              {/* Icon ---------- */}
              <span
                className={`${
                  theme.isSidebarCollapsed
                    ? "text-2xl xl:text-3xl"
                    : "text-xl xl:text-2xl"
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

        {/* logout ------------------------ */}
        <li
          className={`${
            theme.isSidebarCollapsed ? "w-max" : "w-full"
          } cursor-pointer`}
          onClick={() => {
            handelDesconnect();
          }}
        >
          <div className={`flex flex-row p-2 items-center`}>
            {/* Icon ---------- */}
            <span
              className={`${
                theme.isSidebarCollapsed
                  ? "text-2xl xl:text-3xl"
                  : "text-xl xl:text-2xl"
              }`}
            >
              {<icons.logout />}
            </span>

            {/* title ---- */}
            <span
              className={`text-base overflow-hidden w-max ${
                theme.isSidebarCollapsed ? "hidden" : "ml-8"
              }`}
            >
              Logout
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
