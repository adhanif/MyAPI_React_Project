import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./PaginationBtn.css";
export default function PaginationBtn({ postLists, setPage, postsPerPage }) {
  const [activePageNumber, setactivePageNumber] = useState(1); // for activating the page
  const items = [];
  const totalPages = Math.ceil(postLists.length / postsPerPage); // Calculate the total number of pages

  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePageNumber}
        onClick={() => selectPageHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const selectPageHandler = (pageNumber) => {
    setPage(pageNumber);
    setactivePageNumber(pageNumber);
  };
  return (
    <div>
      <br />
      <Pagination size={"md"} className="justify-content-center mt-5">
        {items}
      </Pagination>
      <br />

      {/* <Pagination size="sm">{items}</Pagination> */}
    </div>
  );
}
