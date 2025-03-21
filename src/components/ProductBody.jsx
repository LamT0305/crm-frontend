import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../assets/CloseIcon";
import useProduct from "../hooks/useProduct";

function ProductBody({ columns, setOpenForm, setProductId }) {
  const navigate = useNavigate();
  const { products, totalPages, handleSetProducts, handleDeleteProduct } =
    useProduct();
  const [page, setPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);
  useEffect(() => {
    handleSetProducts(page);
  }, [page]);

  const onOpenForm = (id) => {
    setProductId(id);
    setOpenForm(true);
  };

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
    <div className="flex flex-col h-full justify-between">
      <div className="overflow-x-auto px-2">
        <table className="table-auto border-collapse w-full">
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
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b cursor-pointer hover:bg-gray-200"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => onOpenForm(product._id)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center"
                  >
                    {col.key === "price"
                      ? `$${product[col.key]}`
                      : col.key === "createdAt" || col.key === "updatedAt"
                      ? new Date(product[col.key]).toLocaleDateString()
                      : product[col.key] || "-"}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <div
                      onClick={() => handleDeleteProduct(product._id)}
                      className="w-fit"
                    >
                      <CloseIcon className="w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-red-400 hover:text-white" />
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

export default ProductBody;
