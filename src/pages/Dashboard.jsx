import React, { useEffect, useRef, useState } from "react";
import LeadHeader from "../components/LeadHeader";
import Filter from "../components/Filter";
import LeadBody from "../components/LeadBody";
import CreateLeadForm from "../components/form/CreateLeadForm";
import useLead from "../hooks/useLead";

function Dashboard() {
  const { handleFilterleads, handleSortLeads, handleSetLeads } = useLead();

  const [isOpen, setIsOpen] = useState(false);
  const STORAGE_KEY = "selectedColumns";

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

  return (
    <div className="w-[80%] bg-white flex flex-col">
      {isOpen && <CreateLeadForm setIsOpen={setIsOpen} />}

      <LeadHeader setIsOpen={setIsOpen} />
      <Filter
        addColumn={addColumn}
        removeColumn={removeColumn}
        columns={columns}
        defaultColumns={defaultColumns}
        handleSort={handleSortLeads}
        handleFilter={handleFilterleads}
        handleSetDefaultData={handleSetLeads}
      />
      <LeadBody columns={columns} />
    </div>
  );
}

export default Dashboard;
