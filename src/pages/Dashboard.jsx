import React, { useEffect, useRef, useState } from "react";
import LeadHeader from "../components/LeadHeader";
import Filter from "../components/Filter";
import LeadBody from "../components/LeadBody";
import CreateLeadForm from "../components/CreateLeadForm";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const STORAGE_KEY = "selectedColumns";

  const defaultColumns = [
    { key: "name", value: "Name" },
    { key: "email", value: "Email" },
    { key: "phone", value: "Phone" },
    { key: "sourceName", value: "Source" },
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
      {isOpen && <CreateLeadForm setIsOpen={setIsOpen} />}

      <LeadHeader setIsOpen={setIsOpen} />
      <Filter
        addColumn={addColumn}
        removeColumn={removeColumn}
        columns={columns}
        defaultColumns={defaultColumns}
      />
      <LeadBody columns={columns} />
    </div>
  );
}

export default Dashboard;
