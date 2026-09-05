import { Routes, Route } from "react-router-dom";

import Login from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";

import CreateCustomer from "./pages/customer/customerCreate";
import CustomerLogin from "./pages/customer/customerLogin";

import Layout from "./components/layout";

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
        path="/admin"
        element={<Layout />}
      >

        <Route
          path="dashboard"
          element={<Dashboard />}
        />


  

      </Route>


      {/* =========================
          CUSTOMER
      ========================= */}

      <Route
        path="/customer/register"
        element={<CreateCustomer />}
      />

      <Route
        path="/customer/login"
        element={<CustomerLogin />}
      />

    </Routes>
  );
}