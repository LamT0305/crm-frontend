import React, { useEffect } from "react";
import useWorkspace from "../hooks/useWorkspace";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CheckWorkspace() {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!loading && user) {
      if (user.hasCompletedOnboarding) {
        navigate("/", { replace: true });
      } else {
        navigate("/welcome", { replace: true });
      }
    }
  }, [isAuthenticated, user, loading]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Checking your workspace...</p>
      </div>
    </div>
  );
}

export default CheckWorkspace;
