import React, { useState, useEffect } from "react";

function ObjectFilter({ data, setSearchResult, setFilteredDataType }) {
  const [selectedKey, setSelectedKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [availableCountries, setAvailableCountries] = useState([]);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
      const uniqueCountries = [...new Set(data.map((item) => item.country))];
      setAvailableCountries(uniqueCountries);
    }
  }, [data]);

  const handleKeyChange = (event) => {
    const { value } = event.target;
    setSelectedKey(value);
  };

  const handleFilterValueChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
  };

  const handleFilter = () => {
    if (selectedKey === "country") {
      const filteredData = data.filter(
        (item) => item[selectedKey] === filterValue
      );
      setFilteredDataType(filteredData);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="object-filter">
      <div>
        <label htmlFor="keySelect">Select country to filter by:</label>
        <select id="keySelect" value={selectedKey} onChange={handleKeyChange}>
          <option value="">choose an option</option>
          <option value="country">country</option>
        </select>
      </div>

      {selectedKey === "country" && (
        <div>
          <label htmlFor="countrySelect">Select country:</label>
          <select
            id="countrySelect"
            value={filterValue}
            onChange={handleFilterValueChange}
          >
            <option
              value=""
              onClick={() => {
                setFilteredDataType(data);
              }}
            >
              All
            </option>
            {availableCountries.map((country) => (
              <option key={country} value={country} onClick={handleFilter}>
                {country}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default ObjectFilter;
