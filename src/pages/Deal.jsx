import React, { useEffect, useState } from "react";
import DealForm from "../components/form/DealForm";
import Filter from "../components/Filter";
import DealBody from "../components/DealBody";
import useDeal from "../hooks/useDeal";

function Deal() {
  const { handleFilterDeals, handleSortDeals, handleSetDeals } = useDeal();
  const [openDealForm, setOpenDealForm] = useState(false);
  const [dealId, setDealId] = useState(null);
  const STORAGE_KEY = "selectedDealColumns";

  const defaultColumns = [
    { key: "customerId._id", value: "Customer ID" },
    { key: "customerId.firstName", value: "First Name" },
    { key: "customerId.lastName", value: "Last Name" },
    { key: "quotationId.totalPrice", value: "Total Amount" },
    { key: "quotationId.discount.type", value: "Discount Type" },
    { key: "quotationId.discount.value", value: "Discount Value" },
    { key: "quotationId.finalPrice", value: "Final Price" },
    { key: "status", value: "Status" },
    { key: "createdAt", value: "Created At" },
  ];

  const getStoredColumns = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultColumns;
  };

  const [columns, setColumns] = useState(getStoredColumns);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const addColumn = (key, value) => {
    if (!columns.some((col) => col.key === key)) {
      const newColumns = [...columns, { key, value }];
      newColumns.sort(
        (a, b) =>
          defaultColumns.findIndex((col) => col.key === a.key) -
          defaultColumns.findIndex((col) => col.key === b.key)
      );
      setColumns(newColumns);
    }
  };

  const removeColumn = (key) => {
    setColumns(columns.filter((col) => col.key !== key));
  };
  return (
    <div className="w-[80%] bg-white">
      {openDealForm && (
        <DealForm
          setOpenDeal={setOpenDealForm}
          dealId={dealId}
          setDealId={setDealId}
        />
      )}
      {/* header */}
      <div className="flex items-center justify-between border-b border-gray-300 shadow-sm bg-white px-5 py-3">
        <p className="text-lg font-bold">Deals</p>
      </div>
      <Filter
        addColumn={addColumn}
        removeColumn={removeColumn}
        defaultColumns={defaultColumns}
        columns={columns}
        handleFilter={handleFilterDeals}
        handleSort={handleSortDeals}
        handleSetDefaultData={handleSetDeals}
      />
      <DealBody
        columns={columns}
        setOpenDealForm={setOpenDealForm}
        setDealId={setDealId}
      />
    </div>
  );
}

export default Deal;
