import React from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);
  return <div>Dashboard</div>;
}

export default Dashboard;
