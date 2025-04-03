import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useWorkspace from "../hooks/useWorkspace";
import { notify } from "../utils/Toastify";
import { useAuth } from "../context/AuthContext";
import { CircularProgress } from "@mui/material";

function JoinWorkSpace() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { handleJoinWorkspace, isLoading } = useWorkspace();
  const [error, setError] = useState(null);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const joinWorkspace = async () => {
      try {
        if (!token) {
          notify.error("Invalid invitation link");
          navigate("/welcome");
          return;
        }
        if (!isAuthenticated) {
          navigate("/login");
        }
        await handleJoinWorkspace(token);
      } catch (err) {
        setError(err.message || "Failed to join workspace");
        notify.error(err.message || "Failed to join workspace");
      }
    };

    if (!loading) {
      joinWorkspace();
    }
  }, [token, isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[80%] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Joining Workspace
          </h2>
          {isLoading ? (
            <p className="text-gray-600">Processing your invitation...</p>
          ) : error ? (
            <div className="text-red-500">
              <p>{error}</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <CircularProgress />
              <p className="text-gray-600">
                You will be redirected to the dashboard shortly...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JoinWorkSpace;
