import React, { useEffect, useRef, useState } from "react";
import LeadHeader from "../components/lead/LeadHeader";
import Filter from "../components/Filter";
import LeadBody from "../components/lead/LeadBody";
import CreateLeadForm from "../components/form/CreateLeadForm";
import useLead from "../hooks/useLead";
import useWorkspace from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { currentWorkspace, isLoading: workspaceLoading } = useWorkspace();
  const {
    handleFilterleads,
    handleSortLeads,
    handleSetLeads,
    isLoading,
    HandlefilterByLeadTags,
  } = useLead();

  const [isOpen, setIsOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const initializeData = async () => {
      await handleSetLeads();
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

  // if (isLoading) {
  //   return (

  //   );
  // }
  return (
    <>
      {isLoading && isInitialLoad ? (
        <div className="flex items-center justify-center h-screen w-[80%]">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="w-[80%] bg-white flex flex-col">
          {isOpen && <CreateLeadForm setIsOpen={setIsOpen} />}

          <LeadHeader setIsOpen={setIsOpen} />
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="border border-gray-300 ml-2 px-2 py-1 rounded-lg w-[15%] text-sm font-semibold"
              placeholder="Search by Tags...."
              onChange={(e) => HandlefilterByLeadTags(e.target.value)}
            />
            <Filter
              addColumn={addColumn}
              removeColumn={removeColumn}
              columns={columns}
              defaultColumns={defaultColumns}
              handleSort={handleSortLeads}
              handleFilter={handleFilterleads}
              handleSetDefaultData={handleSetLeads}
            />
          </div>

          <LeadBody columns={columns} />
        </div>
      )}
    </>
  );
}

export default Dashboard;
