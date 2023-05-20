import React from "react";
import "./Pagination.css";

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage = 1, // Set default value to 1
  paginate,
}) {
  const pageNumbers = [];

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Calculate the range of pages to display around the current page
  const range = 10;
  const halfRange = Math.floor(range / 2);
  let minRange = Math.max(1, currentPage - halfRange);
  let maxRange = Math.min(currentPage + halfRange, totalPages);

  // Adjust the range if it exceeds the total number of pages
  if (maxRange - minRange < range - 1) {
    const diff = range - (maxRange - minRange + 1);
    minRange = Math.max(1, minRange - diff);
    maxRange = Math.min(totalPages, maxRange + diff);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => {
          if (number >= minRange && number <= maxRange) {
            return (
              <li key={number} className="page-item">
                <button
                  className={`page-link ${
                    currentPage === number ? "active" : ""
                  }`}
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            );
          }
          return null;
        })}
        <li className="page-item">
          <button
            className="page-link"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
