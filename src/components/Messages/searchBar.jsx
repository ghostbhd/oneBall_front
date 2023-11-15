
import style from '/home/hajar/Desktop/front/src/style.js';
import { BiSearchAlt } from "react-icons/bi";
import React, { useState } from 'react'; 

const SearchBar = ({ onSearch, onSearchSubmit }) => {
    const [inputValue, setInputValue] = useState(''); // Add state to manage the input value
  
    // Update both onSearch and onSearchSubmit to accept a value
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSearchSubmit(inputValue); // Pass the input value to the search submit handler
      }
    };
    return (
        <div className={`flex items-center ${style.searchBar}`}>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue} // Controlled input must have a value
            onChange={(e) => {
              setInputValue(e.target.value); // Update the inputValue state
              onSearch(e.target.value); // Call onSearch as the input changes
            }}
            onKeyPress={handleKeyPress} // Handle the Enter key press
            className="w-full p-1 rounded-l-lg bg-zinc-200" 
          />
          <button 
            onClick={() => onSearchSubmit(inputValue)} // Use arrow function to pass the inputValue to onSearchSubmit
            className="p-2 rounded-r-lg bg-indigo-300" 
          >
            <BiSearchAlt />
          </button>
        </div>
      );
    };
    
    export default SearchBar;
    
