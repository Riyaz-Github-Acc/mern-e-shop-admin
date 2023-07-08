/* eslint-disable react/prop-types */
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const Pagination = ({ currentPage, setCurrentPage, itemsPerPage, total }) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="flex flex-row items-center justify-end gap-3 mt-5">
      <button
        disabled={currentPage === 1}
        className="w-10 h-10 bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md text-white font-medium mt-2 rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <KeyboardArrowLeft />
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={`w-10 h-10 border border-cyan-800 text-black hover:text-white hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md  font-medium mt-2 rounded-md transition-all duration-300 disabled:bg-opacity-75 disabled:cursor-not-allowed ${
            currentPage === index + 1 ? "bg-cyan-800 text-white" : ""
          }`}
          key={index}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        className="w-10 h-10 bg-cyan-800 hover:bg-cyan-900 focus:outline-none focus:shadow-lg text-md text-white font-medium mt-2 rounded-md disabled:bg-opacity-75 disabled:cursor-not-allowed"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <KeyboardArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
