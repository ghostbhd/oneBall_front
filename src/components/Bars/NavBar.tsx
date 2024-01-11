import { icons, phoneNavBar } from "../../constants";
import React, { useState, useEffect, useRef } from "react";
import NotificationBadge from "./NotificationBadge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSocket } from "../../Socketio";
import * as jwtDecode from "jwt-decode";
import { GetHeaders } from "../../jwt_token";
import Cookies from "js-cookie";

const NavBar: React.FC = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [usernames, setUsernames] = useState([]); // ["user1", "user2", "user3"]
  const [searchResults, setSearchResults] = useState([]); // ["user1", "user2", "user3"
  const notifRef = useRef();
  const searchInputRef = useRef();
  const history = useNavigate();
  const location = useLocation();
  var username: any = "";

  const token: any = GetHeaders().jwttt;
  let decoded: any;
  if (token) decoded = jwtDecode.jwtDecode(token);
  else decoded = null;
  const socket: any = useSocket();

  // Get all usernames ------------------------------------
  useEffect(() => {
    if (socket == null) return;
    socket.on("Users-List", (data: any) => {
      setUsernames(data);
    });
    socket.on("deconnected", (ok: string) => {
      console.log("ok ======== ", ok);
      if (ok === "ok") {
        Cookies.remove("accessToken");
        socket.disconnect();
        history("/Auth");
      }
    });

    return () => {
      socket.off("Users-List");
      socket.off("deconnected");
    };
  }, [socket]);

  // Reset search results when search bar is closed -------
  useEffect(() => {
    if (!showSearch) {
      setSearchValue("");
      setSearchResults([]);
    }
  }, [showSearch]);

  // Close search bar when clicked outside ----------------
  const handleClickOutside = (event: any) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target) &&
      (!notifRef.current || !notifRef.current.contains(event.target))
    ) {
      setShowNotif(false);
      setShowSearch(false);
    }
  };

  // Disconnect -------------------------------------------
  const handelDesconnect = () => {
    console.log(socket);
    if (socket == undefined || socket == null) {
      console.log("hhhhhhhhh");
      return;
    } else {
      socket.emit("deconnect", decoded.name);
    }
  };

  // Get all usernames ------------------------------------
  const handelGetUsernames = () => {
    if (socket == null) return;
    socket.emit("Users", decoded.name);
  };

  // Search bar -------------------------------------------
  const handelSearchChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
      return;
    }
    const results = usernames.filter((username) => {
      return username.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setSearchResults(results);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handelNotification = () => {
    console.log("the user notification");
    if (!showNotif) setShowNotif(true);
  };
  return (
    <div
      className={`md:w-4/12 w-full md:pr-10 h-auto absolute z-40 top-0 right-0 md:p-1 
        md:bg-transparent bg-bDark_4/90
      `}
    >
      {/* navbar ------------------------------------------------------------------------------------------------------------- */}
      <div className="md:w-max w-full h-14 md:gap-4 gap-8 flex flex-row md:items-start items-center md:p-1 p-2 ml-auto  md:backdrop-blur-none backdrop-blur-3xl">
        {/* logout icon --------------------------------------------------------- */}
        <div
          className={`md:hidden text-3xl text-bLight_5 cursor-pointer`}
          onClick={() => handelDesconnect()}
        >
          {<icons.logout />}
        </div>
        {/* Logo -------------------------------------------------------------- */}
        <Link to={"/"} className={`md:text-3xl mx-auto absolute left-1/2 -translate-x-1/2 md:hidden text-4xl text-bLight_5`}>
          OB
        </Link>

        {/* search bar --------------------------------------------------------- */}
        <div
          ref={searchInputRef}
          className={`md:text-2xl flex overflow-hidden ml-auto flex-col md:border-2 md:border-bLight_5/40 
            text-bLight_5 md:bg-bDark_4 cursor-pointer rounded-3xl shadow-4xl
            ${
              showSearch
                ? "border-2 border-bLight_5/40 text-2xl my-auto"
                : "text-3xl"
            }
          `}
        >
          <div className={`flex items-center `}>
            {/* search input ----------------------------------------------------- */}
            <input
              type="text"
              className={`text-bLight_5 outline-none placeholder:text-bLight_5 text-sm bg-transparent transition-all ease-in-out duration-400 ${
                showSearch ? "w-60 p-2" : "w-0 p-0"
              }`}
              placeholder="Search for users"
              onChange={handelSearchChange}
              autoFocus={showSearch}
              value={searchValue}
            />
            {/* search icon ----------------------------------------------------- */}
            <div
              className="md:p-2 flex items-center"
              onClick={() => setShowSearch(!showSearch)}
            >
              {!showSearch ? (
                <icons.search onClick={handelGetUsernames} />
              ) : (
                <icons.xmark />
              )}
            </div>
          </div>
          {/* search results ----------------------------------------------------- */}
          {showSearch ? (
            <div className={`w-full text-base flex flex-col bg-bDark_4`}>
              {searchResults.slice(0, 5).map((username, index) => (
                <Link
                  to={`/profile/${username}`}
                  key={index}
                  className={`p-2 hover:bg-bDark_2 hover:text-bLight_3`}
                >
                  @{username}
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {/* notification icon --------------------------------------- */}
        <div
          className={`md:text-2xl text-3xl md:text-bDark_4 text-bLight_5 md:ml-auto cursor-pointer md:p-2 md:bg-bLight_4/70 rounded-full`}
          onClick={handelNotification}
        >
          {<icons.notifications />}
        </div>

        {/* setting icon --------------------------------------------------------- */}
        <Link
          to={"/settings"}
          className={`md:hidden text-3xl text-bLight_5 cursor-pointer ${
            location.pathname === `/settings` ||
            location.pathname === "/settings/"
              ? `text-white`
              : ""
          }}`}
        >
          {<icons.settings />}
        </Link>
      </div>

      {/* notification badge --------- */}
      {/* {showNotif ? ( */}
      <NotificationBadge {...{ notifRef, showNotif, setShowNotif }} />
      {/* ) : null} */}
    </div>
  );
};

export default NavBar;
