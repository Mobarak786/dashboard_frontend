import React from "react";

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

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="w-full flex justify-center gap-2 mt-5">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          disabled={currentPage === index + 1}
          onClick={() => handlePageClick(index + 1)}
          className="text-xl w-[50px] h-[50px]  border rounded-md border-green-500"
          style={{
            backgroundColor: currentPage === index + 1 ? "#22c55e" : "inherit",
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
