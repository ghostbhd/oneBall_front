import { icons } from "../../constants";
import { useState, useEffect, useRef } from "react";
import NotificationBadge from "./NotificationBadge";
import { Link } from "react-router-dom";
import { useSocket } from "../../Socketio";
import * as jwtDecode from "jwt-decode";
import { GetHeaders } from "../../jwt_token";

const NavBar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [usernames, setUsernames] = useState([]); // ["user1", "user2", "user3"]
  const [searchResults, setSearchResults] = useState([]); // ["user1", "user2", "user3"
  const notifRef = useRef();
  const searchInputRef = useRef();

  const token = GetHeaders().jwttt;
  let decoded;
  if (token) decoded = jwtDecode.jwtDecode(token);
  else decoded = null;
  const socket = useSocket();
  
  // Get all usernames ------------------------------------
  useEffect(() => {
    if (socket == null) return;
    socket.on("Users-List", (data) => {
      setUsernames(data);
    });
    return () => {
      socket.off("Users-List");
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
  const handleClickOutside = (event) => {
    if (
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target) &&
      (!notifRef.current || !notifRef.current.contains(event.target))
    ) {
      setShowNotif(false);
      setShowSearch(false);
    }
  };

  
  const handelGetUsernames = () => {
    if (socket == null) return;
    socket.emit("Users", decoded.name);
  };

  const handleKeyDown = (event) => {
    // Check the key code
    if (event.key === "Enter") {
      // Handle the Enter key press
      console.log("Enter key pressed!", "search value is ", searchValue);
    }
  };

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
    if (socket == null) return;
    setShowNotif(true);
    socket.emit("Notification", decoded.name);
  };
  return (
    <div
      className={`md:w-4/12 w-full md:pr-10 h-auto absolute z-40 top-0 right-0 md:p-1 
        md:bg-transparent bg-bDark_4/90
      `}
    >
      <div className="md:w-max w-full gap-4 flex flex-row items-start p-1 md:ml-auto  md:backdrop-blur-none backdrop-blur-3xl">
        {/* search bar --------------------------------------------------------- */}
        <div
          ref={searchInputRef}
          className={`text-2xl flex overflow-hidden flex-col border-2 border-bLight_5/40 text-bLight_5 bg-bDark_4 cursor-pointer rounded-3xl shadow-4xl transition-all`}
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
              onKeyDown={handleKeyDown}
            />
            {/* search icon ----------------------------------------------------- */}
            <div
              className="p-2 flex items-center"
              onClick={() => setShowSearch(!showSearch)}
            >
              {!showSearch ? <icons.search onClick={handelGetUsernames} /> : <icons.xmark />}
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
          className={`text-2xl text-bDark_4 md:ml-auto cursor-pointer p-2 bg-bLight_4/70 rounded-full`}
          onClick={() => handelNotification()}
        >
          {<icons.notifications />}
        </div>

        {/* menu icon --------------------------------------------------------- */}
        <div
          className={`md:hidden text-3xl text-bLight_5 ml-auto cursor-pointer`}
        >
          {<icons.menu />}
        </div>
      </div>

      {/* notification badge --------- */}
      {/* {showNotif ? ( */}
      <NotificationBadge {...{ notifRef, showNotif, setShowNotif }} />
      {/* ) : null} */}
    </div>
  );
};

export default NavBar;
