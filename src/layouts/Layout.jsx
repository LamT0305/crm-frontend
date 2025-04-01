// src/components/Layout.js
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import useNotification from "../hooks/useNotification";
import AddWorkspaceForm from "../components/form/AddWorkspaceForm";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useNotification();
  const [addWS, setAddWS] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect inside useEffect to avoid render issues
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <Sidebar setAddWS={setAddWS} />
      {/* Dynamic Page Content */}
      <Outlet />

      {addWS && <AddWorkspaceForm setWS={setAddWS} />}
    </div>
  );
};

export default Layout;
