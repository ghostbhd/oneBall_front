
import style from '/home/hajar/Desktop/front/src/style.js';
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from 'react'; 
import { MdGroupAdd } from "react-icons/md"; 

const SearchBar = ({ onSearch, onSearchSubmit,onChannelIconClick }) => {
    const [inputValue, setInputValue] = useState(''); 
  

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSearchSubmit(inputValue); 
      }
    };
    return (
        <div className={`flex items-center ${style.searchBar}`}>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value); 
              onSearch(e.target.value); 
            }}
            onKeyPress={handleKeyPress} 
            className="w-full p-1 rounded-l-lg bg-zinc-200" 
          />
          <button 
            onClick={() => onSearchSubmit(inputValue)} 
            className="p-2 rounded-r-lg bg-indigo-300" 
          >
            <BiSearchAlt />
          </button>
          <MdGroupAdd onClick={onChannelIconClick} className="text-2xl  m-1  cursor-pointer" /> {/* Add the channel icon here */}
        </div>
      );
    };
    
    export default SearchBar;
    
