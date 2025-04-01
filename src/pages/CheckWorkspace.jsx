import React, { useEffect } from "react";
import useWorkspace from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function CheckWorkspace() {
  const { handleGetUserWorkspaces, workspaces, isLoading } = useWorkspace();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetUserWorkspaces();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (workspaces?.length > 0) {
        navigate("/");
      } else {
        navigate("/welcome");
      }
    }
  }, [workspaces, isLoading, navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <CircularProgress />
      <p className="ml-3">Checking workspace...</p>
    </div>
  );
}

export default CheckWorkspace;
