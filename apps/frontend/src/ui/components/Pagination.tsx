import React, { useState } from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);
  };

  return (
    <nav className="flex justify-center mt-4">
      <ul className="pagination inline-flex -space-x-px text-sm">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => handleClick(number)}
              className={`${
                currentPage === number
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700'
              } font-semibold py-2 px-4 rounded`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
