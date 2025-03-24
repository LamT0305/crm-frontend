import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/CloseIcon";
import useDeal from "../hooks/useDeal";
import useActivity from "../hooks/useActivity";

function DealBody({ columns, setOpenDealForm, setDealId }) {
  const {
    deals,
    totalPages,
    handleSetDeals,
    handleDeleteDeal,
    handleChangePage,
  } = useDeal();
  const { handleAddActivity } = useActivity();
  const [page, setPage] = useState(1);
  const [displayedPages, setDisplayedPages] = useState([]);

  useEffect(() => {
    handleSetDeals();
  }, []); // Fetch all deals once on mount

  useEffect(() => {
    handleChangePage(page);
  }, [page]); // Update displayed deals when page changes

  const onOpenForm = (id) => {
    setDealId(id);
    setOpenDealForm(true);
  };

  const getNestedValue = (obj, path) => {
    const keys = path.split(".");
    let value = obj;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) return "-";
    }
    return value;
  };

  const formatValue = (value, key) => {
    if (!value) return "-";

    if (key.includes("Price")) {
      return `$${Number(value).toFixed(2)}`;
    }
    if (key === "createdAt" || key === "updatedAt") {
      return new Date(value).toLocaleDateString();
    }
    return value;
  };

  const renderCellContent = (deal, key) => {
    const value = getNestedValue(deal, key);
    return formatValue(value, key);
  };

  const onDeleteDeal = async (id, customerId) => {
    await handleDeleteDeal(id);
    const activity = {
      customerId: customerId,
      type: "deal",
      subject: "delete a deal",
    };
    await handleAddActivity(activity);
    // Refresh current page after deletion
    handleChangePage(page);
  };

  useEffect(() => {
    const calculateDisplayedPages = () => {
      let start, end;

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

  console.log(deals)
  return (
    <div className="flex flex-col justify-between h-full">
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
          <tbody>
            {deals?.map((deal) => (
              <tr
                key={deal._id}
                className="border-b cursor-pointer hover:bg-gray-200 h-fit"
              >
                {columns.map((col) => (
                  <td
                    onClick={() => onOpenForm(deal._id)}
                    key={col.key}
                    className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center h-fit"
                  >
                    {renderCellContent(deal, col.key)}
                  </td>
                ))}
                <td className="px-3 py-4 border-b border-gray-300 w-max whitespace-nowrap text-center mx-auto">
                  <div className="flex justify-center">
                    <div
                      onClick={() =>
                        onDeleteDeal(deal._id, deal.customerId._id)
                      }
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

      <div className="flex justify-center items-center gap-2 mb-5">
        <button
          onClick={() => {
            setPage(page - 1);
            handleChangePage(page - 1);
          }}
          disabled={page === 1}
          className="px-2 bg-gray-200 rounded-lg cursor-pointer disabled:opacity-50"
        >
          {"<"}
        </button>

        {displayedPages.map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => {
              setPage(pageNum);
              handleChangePage(pageNum);
            }}
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
          onClick={() => {
            setPage(page + 1);
            handleChangePage(page + 1);
          }}
          disabled={page >= totalPages}
          className="px-2 bg-gray-200 rounded-lg cursor-pointer disabled:opacity-50"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

export default DealBody;
