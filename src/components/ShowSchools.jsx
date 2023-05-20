import React, { useState, useEffect } from "react";
import {
  FaSchool,
  FaGlobeAmericas,
  FaIdCard,
  FaExternalLinkAlt,
} from "react-icons/fa";
import Pagination from "./Pagination";

export default function ShowSchools({ searchResult, searchData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [currentItems, setCurrentItems] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchResult, searchData]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const slicedItems = searchResult?.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(slicedItems);
  }, [searchResult, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    const totalPages = Math.ceil(searchResult?.length / itemsPerPage);
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    setCurrentPage(pageNumber);
  };

  return (
    <div className="showSchools">
      <h1>Schools in {searchData ? searchData : "The World"}</h1>
      <p>School count: {searchResult?.length}</p>
      <div className="schoolGrid">
        {currentItems?.map((data, index) => (
          <div key={index} className="school">
            <p>
              <span className="title-icon">
                <FaIdCard />
              </span>
              <br />
              {data.country}
            </p>
            <p>
              <span className="title-icon">
                <FaGlobeAmericas />
              </span>
              <br />
              {data?.alpha_two_code}
            </p>
            <p>
              <span className="title-icon">
                <FaSchool />
              </span>
              <br />
              {data.name}
            </p>
            {data?.web_pages && data.web_pages?.length > 0 && (
              <div>
                {data?.web_pages?.map((webPage, index) => (
                  <p key={index}>
                    <a href={webPage} target="_blank" rel="noreferrer">
                      <FaExternalLinkAlt className="icon" /> Web Pages
                    </a>
                  </p>
                ))}
              </div>
            )}
            {data?.domains && data?.domains.length > 0 && (
              <div className="domains">
                {data?.domains?.map((domain, index) => (
                  <p key={index}>
                    {/* <a href={domain}> */}
                    <FaExternalLinkAlt className="icon" /> domain
                    <br />
                    {domain}
                    {/* </a> */}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={searchResult?.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
}
