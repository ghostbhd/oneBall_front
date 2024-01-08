import style from "../../style";
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useSocket } from "../../Socketio";
import { chatIcons } from "../../constants";

const SearchBar = ({
  onChannelIconClick,
  currentUserToken,
  setActiveChatUser,
}) => {
  const [inputValue, setInputValue] = useState("");

  const socket = useSocket();

  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      //   // Emit the search event to the server
      socket.emit("search-user", {
        username: inputValue,
        currentUserId: currentUserToken.id,
      });
      setInputValue("");
    }
  };

  return (
    <div className={`pb-2 px-2 flex flex-row items-center`}>
      {/* search bar -------------------------------------------------------------- */}
      <div className={`flex w-10/12 flex-row items-center pr-1 bg-bDark_4/60 rounded-full border-2 border-bLight_5/40`}>
        {/* search input -------------------------------- */}
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="w-full bg-transparent placeholder:text-bLight_4 outline-none border-none rounded-full text-xs text-bLight_3 p-2"
        />
        {/* search icons -------------------------------- */}
        <button
          onClick={handleSearchSubmit}
          className="text-xl pr-1 text-bLight_4 ml-1"
        >
          {<chatIcons.searsh />}
        </button>
      </div>

      {/* add channel icon -------------------------------- */}
      <MdGroupAdd
        onClick={onChannelIconClick}
        className="text-3xl text-bLight_4 ml-auto cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
