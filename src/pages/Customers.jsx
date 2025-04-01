import React, { useEffect, useState } from "react";
import useCustomer from "../hooks/useCustomer";
import Filter from "../components/Filter";
import CustomerBody from "../components/CustomerBody";

function Customers() {
  const {
    handleFilterCustomers,
    handleSortCustomers,
    handleSetCustomers,
    isLoading,
  } = useCustomer();
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    const initializeData = async () => {
      await handleSetCustomers();
      setIsInitialLoad(false);
    };
    initializeData();
  }, []);
  const STORAGE_KEY = "selectedCustomerColumns";

  const defaultColumns = [
    { key: "firstName", value: "First name" },
    { key: "lastName", value: "Last name" },
    { key: "email", value: "Email" },
    { key: "phone", value: "Phone" },
    { key: "gender", value: "Gender" },
    { key: "monthlyIncome", value: "Monthly income" },
    { key: "sourceId.name", value: "Source" },
    { key: "industry", value: "Industry" },
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
      <div className="flex items-center justify-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="w-[80%] bg-white flex flex-col">
      {/* header */}
      <div className="flex items-center justify-between border-b border-gray-300 shadow-sm bg-white px-5 py-3">
        <p className="text-lg font-bold">Customers</p>
      </div>

      {/* filter */}
      <Filter
        addColumn={addColumn}
        removeColumn={removeColumn}
        columns={columns}
        defaultColumns={defaultColumns}
        handleFilter={handleFilterCustomers}
        handleSort={handleSortCustomers}
        handleSetDefaultData={handleSetCustomers}
      />

      {/* body */}
      <CustomerBody columns={columns} />
    </div>
  );
}

export default Customers;
