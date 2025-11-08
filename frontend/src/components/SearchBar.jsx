import React, { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

const SearchBar = ({ onSearch, placeholder = "Search users by name or language..." }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="input input-bordered w-full pr-10 pl-10"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <XIcon className="h-4 w-4" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
