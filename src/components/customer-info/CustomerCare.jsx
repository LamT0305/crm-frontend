import React, { useEffect, useState } from "react";
import CreateInteractionForm from "../form/CreateInteractionForm";
import useCustomerCare from "../../hooks/useCustomerCare";
import CustomerCareIcon from "../../assets/CustomerCareIcon";
import CloseIcon from "../../assets/CloseIcon";

function CustomerCare({ customerId }) {
  const [openFormInteraction, setOpenFormInteraction] = useState(false);
  const {
    interactions,
    handleSetInteractions,
    handleDeleteInteraction,
    handleFilterByNotes,
    handleFilterByType,
    handleSortByDate,
  } = useCustomerCare();

  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [sortByDate, setSortByDate] = useState(false);

  const handleFilter = (field, value) => {
    if (field === "type") {
      setType(value);
      handleFilterByType(value);
    } else {
      setNotes(value);
      handleFilterByNotes(value);
    }
  };

  const handleSort = () => {
    setSortByDate(!sortByDate);
    handleSortByDate(!sortByDate ? "asc" : "desc");
  };

  useEffect(() => {
    if (!customerId) return;
    handleSetInteractions(customerId);
  }, [customerId]);

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      {openFormInteraction && (
        <CreateInteractionForm
          setIsOpen={setOpenFormInteraction}
          customerId={customerId}
        />
      )}

      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Care
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={type}
                onChange={(e) => handleFilter("type", e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Filter by type..."
              />
              <input
                type="text"
                value={notes}
                onChange={(e) => handleFilter("notes", e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Search in notes..."
              />
              <button
                onClick={handleSort}
                className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
              >
                {!sortByDate ? "↑ Newest first" : "↓ Oldest first"}
              </button>
            </div>

            <button
              onClick={() => setOpenFormInteraction(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
            >
              <span>+</span> New Interaction
            </button>
          </div>
        </div>
      </div>

      {interactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-xl text-gray-400">
          <CustomerCareIcon className="h-10 w-10" />
          No interactions
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-6">
          {interactions.map((e) => (
            <div
              key={e._id}
              className="border border-gray-100 shadow-md  cursor-pointer rounded-2xl px-6 py-3"
            >
              <div className="w-full flex justify-end">
                <span onClick={() => handleDeleteInteraction(e._id, e)}>
                  <CloseIcon className="w-6 h-6 p-1 bg-gray-100 rounded-md hover:bg-gray-300 cursor-pointer" />
                </span>
              </div>
              <div>
                <p className="text-sm mb-2">
                  <span className="font-semibold">{e.userId.name}</span>{" "}
                  <span className="text-gray-400">
                    created an interaction with{" "}
                  </span>
                  <span className="font-semibold">
                    {e.customerId.gender === "Male" ? "Mr" : "Ms"}.
                    {e.customerId.lastName}
                  </span>
                </p>
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-semibold mb-2">
                    Interaction type:
                  </p>
                  <p className="bg-gray-100 px-2 py-1 rounded-lg break-words">
                    {e.type}
                  </p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-semibold mb-2">
                    Notes:
                  </p>
                  <p className="bg-gray-100 px-2 py-1 rounded-lg break-words whitespace-pre-wrap">
                    {e.notes}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-2">
                    Date:
                  </p>
                  <p className="text-gray-500 text-sm bg-gray-100 w-fit px-2 py-1 rounded-lg">
                    {new Date(e.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomerCare;
