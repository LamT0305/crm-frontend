import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CustomerInfo from "../pages/CustomerInfo";
import Deal from "../pages/Deal";
import Customers from "../pages/Customers";
import ProductService from "../pages/ProductService";
import Statistic from "../pages/Statistic";
import Setting from "../pages/Setting";
import JoinWorkSpace from "../pages/JoinWorkSpace";
import FirstTimeUser from "../pages/FirstTimeUser";
import Message from "../pages/Message";

function AppRoutes() {
  return (
    <Routes>
      {/* Protected App Routes */}
      <Route element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customerinfo/:id" element={<CustomerInfo />} />
          <Route path="/deals" element={<Deal />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/product-services" element={<ProductService />} />
          <Route path="/statistic" element={<Statistic />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/join-workspace/:token" element={<JoinWorkSpace />} />
          <Route path="/welcome" element={<FirstTimeUser />} />
          <Route path="/messages" element={<Message />} />
        </Route>
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
