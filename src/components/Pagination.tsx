import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages <= 1) return null;
  
  const pageNumbers = [];
  // Always show first page, last page, current page, and one page before and after current page
  const showPages = new Set([
    1,
    totalPages,
    currentPage,
    currentPage - 1,
    currentPage + 1,
  ]);
  
  for (let i = 1; i <= totalPages; i++) {
    if (showPages.has(i) && i > 0 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }
  
  pageNumbers.sort((a, b) => a - b);
  
  // Add ellipses where needed
  const paginationItems = [];
  let prevPage = 0;
  
  for (const pageNum of pageNumbers) {
    if (pageNum - prevPage > 1) {
      paginationItems.push('ellipsis');
    }
    paginationItems.push(pageNum);
    prevPage = pageNum;
  }
  
  return (
    <div className="flex justify-between items-center mt-6 px-4 py-3 bg-white border-t border-gray-100">
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} transactions
      </div>
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-1 rounded-md border ${
            currentPage === 1
              ? 'text-gray-300 border-gray-200 cursor-not-allowed'
              : 'text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        {/* Page numbers */}
        {paginationItems.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500 text-sm">
                ...
              </span>
            );
          }
          
          const pageNum = item as number;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 flex items-center justify-center text-sm rounded-md ${
                currentPage === pageNum
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
              aria-label={`Page ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
        
        {/* Next button */}
        <button
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-1 rounded-md border ${
            currentPage === totalPages
              ? 'text-gray-300 border-gray-200 cursor-not-allowed'
              : 'text-gray-600 border-gray-200 hover:bg-gray-50'
          }`}
          aria-label="Next page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
