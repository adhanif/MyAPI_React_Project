import React from "react";
import Container from "react-bootstrap/Container";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationBtn({ page, postLists, setPage }) {
  const active = 1;
  const items = [];

  for (let number = 1; number <= postLists.length / 10; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => selectPageHandler(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  const selectPageHandler = (pageNumber) => {
    setPage(pageNumber);
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
