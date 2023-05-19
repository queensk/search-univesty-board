import React from "react";

export default function search({
  searchData,
  setSearchData,
  searchDataHandler,
}) {
  return (
    <div className="search">
      <input
        value={searchData}
        onChange={(e) => setSearchData(e.target.value)}
        type="text"
        placeholder="search"
      />
      <button
        onClick={() => {
          searchDataHandler(searchData);
          setSearchData("");
        }}
      >
        search
      </button>
    </div>
  );
}
