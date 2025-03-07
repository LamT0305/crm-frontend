// src/components/Layout.js
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate("/login"); // Redirect to login if not authenticated
    return null;
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
