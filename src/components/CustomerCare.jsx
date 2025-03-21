import React, { useEffect, useState } from "react";
import CreateInteractionForm from "./form/CreateInteractionForm";
import useCustomerCare from "../hooks/useCustomerCare";
import CustomerCareIcon from "../assets/CustomerCareIcon";
import CloseIcon from "../assets/CloseIcon";

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
  const [sortByDate, setSortByDate] = useState("asc");

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
    const newOrder = sortByDate === "asc" ? "desc" : "asc";
    setSortByDate(newOrder);
    handleSortByDate(newOrder);
  };

  useEffect(() => {
    if (!customerId) return;
    handleSetInteractions(customerId);
  }, [customerId]);

  return (
    <div className="w-full h-full bg-white">
      {openFormInteraction && (
        <CreateInteractionForm
          setIsOpen={setOpenFormInteraction}
          customerId={customerId}
        />
      )}
      <div className="flex items-center justify-between shadow-md py-2 px-8">
        <p className="font-bold text-lg">Customer care</p>
        <div className="flex items-center">
          <div className="flex items-center justify-evenly mr-4">
            <label className="flex items-center mx-2 text-md">
              Type
              <input
                type="text"
                value={type}
                onChange={(e) => handleFilter("type", e.target.value)}
                className="bg-gray-100 px-2 py-1 rounded-xl ml-2 text-sm"
                placeholder="enter type..."
              />
            </label>
            <label className="flex items-center mx-2 text-md">
              Notes
              <input
                type="text"
                value={notes}
                onChange={(e) => handleFilter("notes", e.target.value)}
                className="bg-gray-100 px-2 py-1 rounded-xl ml-2 text-sm"
                placeholder="enter notes..."
              />
            </label>
            <button
              onClick={handleSort}
              className="bg-gray-100 px-2 py-1 rounded-xl text-sm cursor-pointer"
            >
              Sort by date ({sortByDate === "asc" ? "↑" : "↓"})
            </button>
          </div>
          <button
            onClick={() => setOpenFormInteraction(true)}
            className="bg-black py-1 px-2 cursor-pointer rounded-xl text-white hover:bg-gray-200 hover:text-black"
          >
            + New interaction
          </button>
        </div>
      </div>

      {interactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-xl text-gray-400">
          <CustomerCareIcon className={"h-10 w-10"} />
          No interactions
        </div>
      ) : (
        <div className="px-10 py-8 max-h-[clamp(200px,75vh,75vh)] overflow-auto">
          {interactions.map((e) => (
            <div
              key={e._id}
              className="border border-gray-300 hover:bg-gray-300 cursor-pointer rounded-2xl px-6 py-3 mb-8"
            >
              <div
                className="w-full flex justify-end"
                onClick={() => handleDeleteInteraction(e._id, e)}
              >
                <CloseIcon className="w-6 h-6 p-1 bg-gray-100 rounded-md hover:bg-gray-300 cursor-pointer" />
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
                  <p className="bg-gray-100 px-2 py-1 rounded-lg">{e.type}</p>
                </div>
                <div className="mb-2">
                  <p className="text-gray-500 text-xs font-semibold mb-2">
                    Notes:
                  </p>
                  <p className="bg-gray-100 px-2 py-1 rounded-lg">{e.notes}</p>
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
