import React, { useState } from 'react'; 
import { BiSearchAlt } from "react-icons/bi";
import style from '/home/hajar/Desktop/front/src/style.js';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSearchSubmit: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onSearchSubmit }) => {
    const [inputValue, setInputValue] = useState<string>(''); 

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
