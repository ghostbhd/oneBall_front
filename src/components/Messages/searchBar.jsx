
import style from '/home/hajar/Desktop/front/src/style.js';
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from 'react'; 

const SearchBar = ({ onSearch, onSearchSubmit }) => {
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
        </div>
      );
    };
    
    export default SearchBar;
    
