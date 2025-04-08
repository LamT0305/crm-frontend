import React, { useEffect, useRef, useState } from "react";
import useWorkspace from "../../hooks/useWorkspace";
import { notify } from "../../utils/Toastify";
import { useAuth } from "../../context/AuthContext";

const AddWorkspaceForm = ({ setWS }) => {
  const [name, setName] = useState("");
  const { handleCreateWorkspace, isLoading } = useWorkspace();
  const { user, updateUser } = useAuth();

  const createRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      notify.error("Workspace name is required");
      return;
    }

    const success = await handleCreateWorkspace({ name });
    if (success) {
      setWS(false);
      const updatedUser = {
        ...user,
        hasCompletedOnboarding: true,
      };
      updateUser(updatedUser);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (createRef.current && !createRef.current.contains(e.target)) {
        setWS(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div
        ref={createRef}
        className="bg-white rounded-lg p-6 w-96 border border-gray-200 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Workspace</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Workspace Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter workspace name"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setWS(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? "Creating..." : "Create Workspace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkspaceForm;
