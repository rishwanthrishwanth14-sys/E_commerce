import { Routes, Route } from "react-router-dom";

import Login from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";

import CreateCustomer from "./pages/customer/customerCreate";
import CustomerLogin from "./pages/customer/customerLogin";
import CustomerDashboard from "./pages/customer/customerdashboard";
import CustomerAddresses from "./pages/customer/customerAddress";
import CustomerOrders from "./pages/customer/customeOrder";
import CustomerProfile from "./pages/customer/customerprofile";
import CustomerShop from "./pages/customer/customerShop";

import AdminLayout from "./components/admin/layout";
import CustomerLayout from "./components/customer/layout";

export default function App() {
  return (
    <Routes>

      {/* =========================
          ADMIN AUTH
      ========================= */}

      <Route
        path="/admin/login"
        element={<Login />}
      />


      {/* =========================
          ADMIN DASHBOARD
      ========================= */}

      <Route
        path="/admin/dashboard"
        element={<AdminLayout />}
      >
        <Route
          index
          element={<AdminDashboard />}
        />
      </Route>


      {/* =========================
          CUSTOMER
      ========================= */}

      <Route
        path="customer/register"
        element={<CreateCustomer />}
      />

      <Route
        path="customer/login"
        element={<CustomerLogin />}
      />

      <Route
        path="/customer"
        element={<CustomerLayout />}
       />

      <Route
        index
        element={<CustomerDashboard />}
      />

      <Route
          path="dashboard"
          element={<CustomerDashboard />}
      />

      <Route
        path="customer/addresses"
        element={<CustomerAddresses />}
      />

      <Route
        path="customer/order"
        element={<CustomerOrders />}
      />

      <Route
        path="customer/profile"
        element={<CustomerProfile />}
      />

      <Route
        path="customer/shop"
        element={<CustomerShop />}
      />

    </Routes>
  );
}