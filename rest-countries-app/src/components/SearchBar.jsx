import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search countries..."
      onChange={(e) => onSearch(e.target.value)}
      className="p-2 border border-gray-300 rounded w-full md:w-80"
    />
  );
};

export default SearchBar;