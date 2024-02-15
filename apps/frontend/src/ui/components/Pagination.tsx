import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState<number[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDisplayedPages = () => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const maxDisplayed = 4; // Mostrar solo 4 páginas
      const middlePage = Math.floor(maxDisplayed / 2);

      if (totalPages <= maxDisplayed) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      } else if (currentPage <= middlePage + 1) {
        return Array.from({ length: maxDisplayed }, (_, i) => i + 1);
      } else if (currentPage >= totalPages - middlePage) {
        return Array.from(
          { length: maxDisplayed },
          (_, i) => totalPages - maxDisplayed + i + 1,
        );
      } else {
        return Array.from(
          { length: maxDisplayed },
          (_, i) => currentPage - middlePage + i,
        );
      }
    };

    setDisplayedPages(calculateDisplayedPages());
  }, [currentPage, totalItems, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      paginate(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      paginate(currentPage - 1);
    }
  };

  return (
    <nav ref={navRef} className="flex justify-center mt-4">
      <ul className="pagination flex -mx-1 whitespace-nowrap">
        <li className={`page-item mx-1 ${currentPage === 1 ? 'hidden' : ''}`}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded h-10 w-10"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </li>
        {displayedPages.map((number) => (
          <li key={number} className="page-item mx-1">
            <button
              onClick={() => {
                setCurrentPage(number);
                paginate(number);
              }}
              className={`${
                currentPage === number
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-200 text-gray-700'
              } font-semibold py-2 px-3 rounded h-10 w-10`}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          className={`page-item mx-1 ${currentPage === Math.ceil(totalItems / itemsPerPage) ? 'hidden' : ''}`}
        >
          <button
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
            className="bg-gray-200 text-gray-700 font-semibold py-2 px-3 rounded h-10 w-10"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
