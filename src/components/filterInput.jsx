import { useState } from "react";

export default function filterInput() {
  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSelectOption = (option) => {
    setSearchValue(option);
    setShowOptions(false);
  };

  return (
    <div className="searchInput">
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleInputChange}
      />
      <button onClick={handleToggleOptions}>Toggle Options</button>
      {showOptions && (
        <ul className="optionsList">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelectOption(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
