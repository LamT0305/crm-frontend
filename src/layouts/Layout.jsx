// src/components/Layout.js
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import useNotification from "../hooks/useNotification";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useNotification();

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
      <Sidebar />
      {/* Dynamic Page Content */}
      <Outlet />
    </div>
  );
};

export default Layout;
