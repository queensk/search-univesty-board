import React from "react";
import { FaSchool, FaGlobeAmericas, FaIdCard } from "react-icons/fa";

export default function ShowSchools({ searchResult, searchData }) {
  return (
    <div className="showSchools">
      <h1>Schools in {searchData ? searchData : "The World"}</h1>
      <p>School count: {searchResult.length}</p>
      <div className="schoolGrid">
        {searchResult.map((data, index) => (
          <div key={index} className="school">
            <p>
              <span className="tittle-name">
                <FaIdCard />
              </span>
              {data.country}
            </p>
            <p>
              <span className="tittle-name">
                <FaGlobeAmericas />
              </span>
              {data.alpha_two_code}
            </p>
            <p>
              <span className="tittle-name">
                <FaSchool />
              </span>
              {data.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
