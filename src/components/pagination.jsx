import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { currentPage, totalPage, pageCount, pageClick } = props;
  let start =
    currentPage % pageCount === 0
      ? Math.floor(currentPage / (pageCount + 1)) * pageCount + 1
      : Math.floor(currentPage / pageCount) * pageCount + 1;
  const end = start + pageCount - 1;

  const pages =
    end > totalPage ? _.range(start, totalPage + 1) : _.range(start, end + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={start === 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            onClick={() => pageClick(start - pageCount)}
          >
            Previous
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button className="page-link" onClick={() => pageClick(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={end > totalPage ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={() => pageClick(end + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
