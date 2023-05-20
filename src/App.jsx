import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search";
import ShowSchools from "./components/ShowSchools";
import ObjectFilter from "./components/ObjectFilter";

export default function App() {
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filteredDataType, setFilteredDataType] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchDataHandler = (data) => {
    fetch(`http://universities.hipolabs.com/search?country=${data}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(true);
        setSearchResult([]);
        setSearchData("");
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (searchResult <= 0) {
      searchDataHandler(searchData);
    }
    setFilteredDataType(searchResult);
  }, [searchResult]);

  return (
    <div className="App">
      <h1>Search for your favorite Universities</h1>
      <Search
        searchData={searchData}
        setSearchData={setSearchData}
        searchDataHandler={searchDataHandler}
      />
      <ObjectFilter
        data={searchResult}
        setSearchResult={setFilteredDataType}
        searchDataHandler={searchDataHandler}
        setFilteredDataType={setFilteredDataType}
      />
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <ShowSchools searchResult={filteredDataType} searchData={searchData} />
      )}
    </div>
  );
}
