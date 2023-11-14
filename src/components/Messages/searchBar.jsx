import React from 'react';
import style from '/home/hajar/Desktop/front/src/style.js';

const SearchBar = ({ onSearch }) => {
  return (
    <div className={`flex items-center ${style.boxWidth} ${style.transition}`}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
