import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import LandingPage from "../pages/LandingPage";
import TermOfService from "../pages/TermOfService";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AuthSuccess from "../pages/AuthSuccess";
import CheckWorkspace from "../pages/CheckWorkspace";

function AuthRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/terms" element={<TermOfService />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />

      {/* Auth Flow Routes */}
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/check-workspace" element={<CheckWorkspace />} />

      {/* Redirect all other routes to landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AuthRoutes;
