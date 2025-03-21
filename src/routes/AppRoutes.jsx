// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AuthSuccess from "../pages/AuthSuccess";
import Profile from "../pages/Profile";
import Layout from "../layouts/Layout";
import CustomerInfo from "../pages/CustomerInfo";
import Deal from "../pages/Deal";
import Customers from "../pages/Customers";
import ProductService from "../pages/ProductService";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Protected Routes */}
        <Route element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customerinfo/:id" element={<CustomerInfo />} />
            <Route path="/deals" element={<Deal />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/product-services" element={<ProductService />} />
          </Route>
        </Route>

        {/* Default Route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
