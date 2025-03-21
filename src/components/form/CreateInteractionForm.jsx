import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/CloseIcon";
import useCustomerCare from "../../hooks/useCustomerCare";

const CreateInteractionForm = ({ setIsOpen, customerId }) => {
  const createRef = useRef(null);
  const { handleCreateInteraction, isLoading } = useCustomerCare();

  const [formData, setFormData] = useState({
    customerId: customerId,
    type: "",
    notes: "",
  });

  const interactionTypes = [
    "Call",
    "Email",
    "Meeting",
    "Follow-up-Sale",
    "Follow-up-Issue",
    "Follow-up-Meeting",
    "Follow-up-Quote",
  ];

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleCreateInteraction({
      ...formData,
      date: new Date().toISOString(),
    });
    onClose();
  };

  const onClose = () => {
    setFormData({
      customerId: customerId,
      type: "",
      notes: "",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 z-100">
      <div
        ref={createRef}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl opacity-100"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">
            Record Customer Interaction
          </h2>
          <div className="w-fit" onClick={onClose}>
            <CloseIcon className="w-6 h-6 p-1 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex flex-col">
              Interaction Type
              <select
                value={formData.type}
                onChange={handleChangeValue}
                required
                name="type"
                disabled={isLoading}
                className="py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50"
              >
                <option value="">Select Type</option>
                {interactionTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/-/g, " ")}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col">
            Notes
            <textarea
              value={formData.notes}
              onChange={handleChangeValue}
              name="notes"
              placeholder="Enter detailed interaction notes..."
              required
              disabled={isLoading}
              className="py-1 px-4 mt-2 rounded-xl bg-gray-100 text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-black/10 disabled:opacity-50"
            />
          </label>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-xl transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 cursor-pointer"
              }`}
            >
              {isLoading ? "Recording..." : "Record Interaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInteractionForm;
