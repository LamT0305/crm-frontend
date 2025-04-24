import React, { useEffect, useState } from "react";
import DealForm from "../components/form/DealForm";
import Filter from "../components/Filter";
import useDeal from "../hooks/useDeal";
import useWorkspace from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import DealBody from "../components/deal/DealBody";

function Deal() {
  const { currentWorkspace, isLoading: workspaceLoading } = useWorkspace();
  const navigate = useNavigate();

  const { handleFilterDeals, handleSortDeals, handleSetDeals, isLoading } =
    useDeal();
  const [openDealForm, setOpenDealForm] = useState(false);
  const [dealId, setDealId] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    const initializeData = async () => {
      await handleSetDeals();
      setIsInitialLoad(false);
    };
    initializeData();
  }, []);
  const [hasCheckedWorkspace, setHasCheckedWorkspace] = useState(true);

  useEffect(() => {
    if (workspaceLoading && hasCheckedWorkspace) {
      if (!currentWorkspace) {
        navigate("/welcome");
      }
      setHasCheckedWorkspace(false);
    }
  }, [currentWorkspace, workspaceLoading]);
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

  if (isLoading && isInitialLoad) {
    return (
      <div className="flex items-center justify-center h-screen w-[80%]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="w-[80%] bg-white flex flex-col">
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
