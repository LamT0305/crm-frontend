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
      <div className="flex flex-col justify-between h-full">
        {/* header */}
        <div className="flex items-center justify-between shadow-md py-2 px-8">
          <p className="font-bold text-lg">Deal history</p>
          <div className="flex items-center">
            <label className="bg-gray-200 text-black px-2 py-1 rounded-xl mr-4">
              Status:
              <input
                className="bg-gray-200 px-2 rounded-xl ml-3"
                type="text"
                onChange={handleFilter}
              />
            </label>
            <p
              onClick={handleSort}
              className="bg-black text-white px-2 py-1 rounded-xl cursor-pointer font-semibold hover:bg-gray-200 hover:text-black"
            >
              Sort by: {sortOrder ? "Newest" : "Latest"}
            </p>
          </div>
        </div>
        {/* body table */}
        <div className="overflow-auto px-2 h-[65vh]">
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr className="bg-gray-100 text-gray-500 text-xs font-thin">
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
                  className="border-b cursor-pointer hover:bg-gray-200"
                >
                  {columns.map((col) => (
                    <td
                      onClick={() => onOpenDeal(deal._id)}
                      key={col.key}
                      className="px-3 py-4 border-b border-gray-300 whitespace-nowrap text-center"
                    >
                      {renderCellContent(deal, col.key)}
                    </td>
                  ))}
                  <td className="px-3 py-4 border-b border-gray-300 whitespace-nowrap text-center">
                    <div className="flex justify-center">
                      <div
                        className="w-fit"
                        onClick={() => onDeleteDeal(deal._id)}
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

        <div className="flex justify-center items-center gap-2 mb-13">
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
    </div>
  );
}

export default CustomerDeal;
