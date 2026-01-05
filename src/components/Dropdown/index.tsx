import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const AutocompleteDropdown = ({ suggestions, onSelectionChange }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setQuery(userInput);

    if (userInput.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.label);
    setShowDropdown(false);
    onSelectionChange(suggestion.value); // Call the callback with the selected value
  };

  const handleIconClick = () => {
    setFilteredSuggestions(suggestions);
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-5">
      <div className="flex items-center border border-gray-300 bg-white rounded-lg overflow-hidden">
        <FaDollarSign className="text-gray-600   bg-white" />
        <input
          type="text"
          className="w-[70%] px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className="px-3 py-3 bg-white h-100" onClick={handleIconClick}>
          <FaCaretDown className="text-gray-600" />
        </button>
      </div>
      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg  mt-1">
          <SimpleBar className="max-h-60">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion?.label}
              </li>
            ))}
          </SimpleBar>
        </ul>
      )}
    </div>
  );
};

export default AutocompleteDropdown;
