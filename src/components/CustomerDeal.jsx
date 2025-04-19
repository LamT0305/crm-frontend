import React, { useEffect, useState } from "react";
import CloseIcon from "../assets/CloseIcon";
import useDeal from "../hooks/useDeal";
import DealForm from "./form/DealForm";

function CustomerDeal({ customerId, columns }) {
  const {
    deals,
    totalPages,
    handleGetCustomerDeals,
    handleChangePage,
    handleFilterCustomerDeals,
    handleSortCustomerDealsByDate,
    handleDeleteDeal,
  } = useDeal();

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(true); //true: asc, false: desc
  const [openDeal, setOpenDeal] = useState(false);
  const [dealId, setDealId] = useState(null);

  useEffect(() => {
    if (customerId) {
      handleGetCustomerDeals(customerId);
    }
  }, [customerId]);

  const renderCellContent = (deal, key) => {
    switch (key) {
      case "customerId._id":
        return deal.customerId?._id || "-";
      case "customerId.firstName":
        return deal.customerId?.firstName || "-";
      case "customerId.lastName":
        return deal.customerId?.lastName || "-";
      case "quotationId.totalPrice":
        return `$${deal.quotationId?.totalPrice?.toLocaleString() || 0}`;
      case "quotationId.discount.type":
        return (
          deal.quotationId?.discount?.type?.charAt(0).toUpperCase() +
            deal.quotationId?.discount?.type?.slice(1) || "-"
        );
      case "quotationId.discount.value":
        return deal.quotationId?.discount?.type === "percentage"
          ? `${deal.quotationId?.discount?.value}%`
          : `$${deal.quotationId?.discount?.value?.toLocaleString() || 0}`;
      case "quotationId.finalPrice":
        return `$${deal.quotationId?.finalPrice?.toLocaleString() || 0}`;
      case "status":
        return (
          <span
            className={`px-2 py-1 rounded-lg ${
              deal.status === "Won"
                ? "bg-green-100 text-green-800"
                : deal.status === "Lost"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {deal.status}
          </span>
        );
      case "createdAt":
        return formatDate(deal.createdAt);
      default:
        return "-";
    }
  };

  const displayedPages = [];
  for (let i = 1; i <= totalPages; i++) {
    displayedPages.push(i);
  }

  const handleSort = () => {
    setSortOrder(!sortOrder);
    handleSortCustomerDealsByDate(sortOrder ? "asc" : "desc");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    handleFilterCustomerDeals("status", value);
  };

  const onDeleteDeal = async (dealId) => {
    await handleDeleteDeal(dealId);
    handleGetCustomerDeals(customerId);
  };

  const onOpenDeal = (dealId) => {
    setOpenDeal(true);
    setDealId(dealId);
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {openDeal && (
        <DealForm
          setOpenDeal={setOpenDeal}
          dealId={dealId}
          setDealId={setDealId}
          customerId={customerId}
        />
      )}
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between py-2 px-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              Deal History
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-lg
                           text-gray-900 placeholder-gray-400 text-sm
                           focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
                           transition-colors duration-200"
                type="text"
                placeholder="Filter by status..."
                onChange={handleFilter}
              />
            </div>
            <button
              onClick={handleSort}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg
                         border border-gray-200 hover:bg-gray-100
                         transition-colors duration-200 flex items-center gap-2"
            >
              <span>Sort:</span>
              {sortOrder ? "Newest" : "Latest"}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-auto px-2 h-[75vh]">
          <table className="w-full">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t-lg"
                  >
                    {col.value}
                  </th>
                ))}
                <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-t-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-center">
              {deals?.map((deal) => (
                <tr
                  key={deal._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td
                      onClick={() => onOpenDeal(deal._id)}
                      key={col.key}
                      className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 cursor-pointer"
                    >
                      {renderCellContent(deal, col.key)}
                    </td>
                  ))}
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => onDeleteDeal(deal._id)}
                      className="p-1 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                    >
                      <CloseIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 p-4 border-t border-gray-100">
          <button
            onClick={() => {
              setPage(page - 1);
              handleChangePage(page - 1);
            }}
            disabled={page === 1}
            className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200 
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </button>

          {displayedPages.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => {
                setPage(pageNum);
                handleChangePage(pageNum);
              }}
              className={`px-4 py-2 rounded-lg transition-colors duration-200
                         ${
                           pageNum === page
                             ? "bg-blue-500 text-white"
                             : "text-gray-700 hover:bg-gray-50"
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
            className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDeal;
