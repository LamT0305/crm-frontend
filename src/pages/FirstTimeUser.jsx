import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWorkspace from "../hooks/useWorkspace";
import { notify } from "../utils/Toastify";

const FirstTimeUser = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const navigate = useNavigate();
  const {
    handleCreateWorkspace,
    isLoading,
    handleGetUserWorkspaces,
    workspaces,
  } = useWorkspace();

  useEffect(() => {
    handleGetUserWorkspaces();
  }, []);

  console.log(workspaces);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim()) {
      notify.error("Please enter a workspace name");
      return;
    }

    const success = await handleCreateWorkspace({ name: workspaceName });
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to CRM
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's set up your workspace to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="workspace"
                className="block text-sm font-medium text-gray-700"
              >
                Workspace Name
              </label>
              <div className="mt-1">
                <input
                  id="workspace"
                  name="workspace"
                  type="text"
                  required
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your workspace name"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Workspace"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FirstTimeUser;
