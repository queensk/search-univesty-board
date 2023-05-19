import { useState, useEffect } from "react";
import "./App.css";
import Search from "./components/search";
import ShowSchools from "./components/ShowSchools";
import FilterInput from "./components/filterInput";

export default function App() {
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState(false);
  const searchDataHandler = (data) => {
    fetch(`http://universities.hipolabs.com/search?country=${data}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        setSearchResult([]);
        setSearchData("");
        setError(false);
      });
  };
  useEffect(() => {
    searchDataHandler(searchData);
  }, []);
  return (
    <div className="App">
      <Search
        searchData={searchData}
        setSearchData={setSearchData}
        searchDataHandler={searchDataHandler}
      />
      <FilterInput />
      <ShowSchools searchResult={searchResult} searchData={searchData} x />
    </div>
  );
}
