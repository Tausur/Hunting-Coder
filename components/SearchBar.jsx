import React from 'react';

const SearchBar = ({ handleSearch }) => {
  return (
    <div className="flex md:w-96 my-8 items-center rounded-md shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow px-4 py-2 bg-white text-gray-700 placeholder-gray-500 focus:outline-none"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
