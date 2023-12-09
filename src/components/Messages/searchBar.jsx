import style from "/home/hajar/Desktop/front/src/style.js";
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useSocket } from "../../Socketio.jsx";


const SearchBar = ({ onChannelIconClick }) => {
  const [inputValue, setInputValue] = useState("");
  const socket = useSocket(); // Get the socket instance
  const CURRENT_USER_ID = 1; // Make sure to retrieve this from the appropriate context

  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
    //   // Emit the search event to the server
      socket.emit("search-user", {
        username: inputValue,
        currentUserId: CURRENT_USER_ID,
      });
      setInputValue(""); // Clear the input field after submitting
    }
    
  };

  return (
    <div className={`flex items-center`}>
      {" "}
      {/* Add your style class names */}
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
        className="w-full p-1 rounded-l-lg bg-zinc-200"
      />
      <button
        onClick={handleSearchSubmit}
        className="p-2 rounded-r-lg bg-indigo-300"
      >
        <BiSearchAlt />
      </button>
      <MdGroupAdd
        onClick={onChannelIconClick}
        className="text-2xl m-1 cursor-pointer"
      />
    </div>
  );
};

export default SearchBar;
