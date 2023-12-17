import style from "../../style";
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from "react";
import { MdGroupAdd } from "react-icons/md";
import { useSocket } from "../../Socketio.jsx";


const SearchBar = ({ onChannelIconClick ,currentUserToken,setActiveChatUser}) => {
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
    <div className={`py-2 flex items-center`}>
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
