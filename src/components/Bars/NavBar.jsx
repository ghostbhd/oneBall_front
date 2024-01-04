import { icons } from "../../constants";
import { useState, useEffect, useRef } from "react";
import NotificationBadge from "./NotificationBadge";

const NavBar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const notifRef = useRef();
  const searchInputRef = useRef();

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current.focus();
    } else {
      setSearchValue("");
    }
  }, [showSearch]);

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

  const handleKeyDown = (event) => {
    // Check the key code
    if (event.key === 'Enter') {
      // Handle the Enter key press
      console.log('Enter key pressed!', "search value is ", searchValue);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`md:w-4/12 w-full md:pr-10 h-auto absolute z-40 top-0 right-0 md:p-1 
        md:bg-transparent bg-bDark_4/90
      `}
    >
      <div className="md:w-max w-full gap-4 flex flex-row items-center p-1 md:ml-auto  md:backdrop-blur-none backdrop-blur-3xl">
        {/* search icon ----------------------------------------------------- */}
        <div
          className={`text-2xl flex items-center text-bLight_5 bg-bDark_4 cursor-pointer rounded-full shadow-4xl transition-all`}
        >
          <input
            ref={searchInputRef}
            type="text"
            className={`text-bLight_5 outline-none placeholder:text-bLight_5 text-sm bg-transparent transition-all ease-in-out duration-400 ${
              showSearch ? "w-60 p-2" : "w-0 p-0"
            }`}
            placeholder="Search for users"
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!showSearch) setSearchValue("");
            }}
            autoFocus={showSearch}
            value={searchValue}
            onKeyDown={handleKeyDown}
          />
          <div
            className="p-2 flex items-center"
            onClick={() => setShowSearch(!showSearch)}
          >
            {!showSearch ? <icons.search /> : <icons.xmark />}
          </div>
        </div>

        {/* notification icon --------------------------------------- */}
        <div
          className={`text-2xl text-bDark_4 md:ml-auto cursor-pointer p-2 bg-bLight_4/70 rounded-full`}
          onClick={() => setShowNotif(true)}
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
