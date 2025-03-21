import React, { useEffect, useState } from "react";
import useLead from "../hooks/useLead";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/CloseIcon";

function LeadBody({ columns }) {
  const navigate = useNavigate();

  const { leads, totalPages, handleSetLeads, handleDeleteLead } = useLead();
  const [page, setPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);
  // let totalPages = 20;

  useEffect(() => {
    handleSetLeads(page);
  }, [page]);
  //pageination
  useEffect(() => {
    const calculateDisplayedPages = () => {
      let start, end;

      // Calculate start and end based on current page
      if (page <= 10) {
        start = 1;
        end = Math.min(10, totalPages);
      } else {
        start = Math.floor((page - 1) / 10) * 10 + 1;
        end = Math.min(start + 9, totalPages);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      setDisplayedPages(pages);
    };

    calculateDisplayedPages();
  }, [page, totalPages]);

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Table */}
      <div className="overflow-x-auto px-2 max-h-[72vh]">
        <table className="table-auto border-collapse w-full h-full">
          <thead>
            <tr className="bg-gray-100 text-gray-500 text-md font-thin">
              {columns.map((col) => (
                <th key={col.key} className="p-2 relative">
                  {col.value}
                </th>
              ))}
              <th className="p-2 relative">Actions</th>
            </tr>
          </thead>
          <tbody className="h-full">
            {leads.map((row, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-200"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => navigate(`/customerinfo/${row._id}`)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {/* Check if key contains a dot (nested property) */}
                    {col.key.includes(".")
                      ? col.key
                          .split(".")
                          .reduce((acc, key) => acc?.[key], row) || "-"
                      : row[col.key] || "-"}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <div
                      onClick={() => handleDeleteLead(row._id)}
                      className="w-fit"
                    >
                      <CloseIcon
                        className={
                          "w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer"
                        }
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-5">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-2  bg-gray-200 rounded-lg cursor-pointer"
        >
          {"<"}
        </button>

        {displayedPages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 rounded-lg cursor-pointer ${
              pageNum === page
                ? "bg-blue-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="px-2  bg-gray-200 rounded-lg cursor-pointer"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default LeadBody;
