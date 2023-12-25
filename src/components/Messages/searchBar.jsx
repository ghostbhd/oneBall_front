import style from "../../style";
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useSocket } from "../../Socketio.jsx";
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
    <div className={`py-2 flex flex-row items-center`}>
      {" "}
      {/* Add your style class names */}
      <div className={`flex w-9/12 flex-row bg-bDark_4 rounded-full`}>
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
          className="w-full bg-transparent outline-none border-none rounded-full text-xs text-bLight_3 p-2"
        />
        <button
          onClick={handleSearchSubmit}
          className="text-2xl pr-1 text-bLight_4 ml-1"
        >
          {<chatIcons.searsh />}
        </button>
      </div>
      <MdGroupAdd
        onClick={onChannelIconClick}
        className="text-3xl text-bLight_4 ml-auto"
      />
    </div>
  );
};

export default SearchBar;
