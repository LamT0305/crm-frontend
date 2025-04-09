import React, { useEffect, useState } from "react";
import useAnalytic from "../hooks/useAnalytic";
import CustomerStatistic from "../components/CustomerStatistic";
import AnalyticNavigation from "../components/AnalyticNavigation";
import DealAnalytic from "../components/DealAnalytic";
import InteractionAnalytic from "../components/InteractionAnalytic";
import SaleAnalytic from "../components/SaleAnalytic";
import useWorkspace from "../hooks/useWorkspace";

function Statistic() {
  const {
    customerAnalytics,
    dealAnalytics,
    interactionAnalytics,
    salesAnalytics,
    isLoading,
    error,
    fetchAllAnalytics,
    setDateFilter,
  } = useAnalytic();
  const [selectedDate, setSelectedDate] = useState("");
  const [tag, setTag] = useState("customer-analytics");
  const { currentWorkspace } = useWorkspace();

  useEffect(() => {
    fetchAllAnalytics();
  }, [currentWorkspace]);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      const [year, month] = date.split("-");
      setDateFilter(parseInt(month), parseInt(year));
    } else {
      fetchAllAnalytics();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">Error loading analytics: {error}</div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 h-full w-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-4">
          <input
            type="month"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 border rounded-lg"
          />
          {selectedDate && (
            <button
              onClick={() => {
                setSelectedDate("");
                fetchAllAnalytics();
              }}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      {/* navigation */}
      <AnalyticNavigation setTag={setTag} tag={tag} />
      {/* dashboard */}
      {tag === "customer-analytics" && (
        <CustomerStatistic customerAnalytics={customerAnalytics} />
      )}
      {tag === "deal-analytics" && (
        <DealAnalytic dealAnalytics={dealAnalytics} />
      )}
      {tag === "customer-interaction" && (
        <InteractionAnalytic interactionAnalytics={interactionAnalytics} />
      )}
      {tag === "sale-performance" && (
        <SaleAnalytic salesAnalytics={salesAnalytics} />
      )}
    </div>
  );
}

export default Statistic;
