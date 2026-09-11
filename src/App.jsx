import { Routes, Route } from "react-router-dom";

import Login from "./pages/homePage/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import CreateProduct from "./pages/admin/CreateProduct";

import CreateCustomer from "./pages/homePage/customer/customerCreate";
import CustomerLogin from "./pages/homePage/customer/customerLogin";
import CustomerDashboard from "./pages/customer/customerdashboard";
import CustomerAddresses from "./pages/customer/customerAddress";
import CustomerOrders from "./pages/customer/customeOrder";
import CustomerProfile from "./pages/customer/customerprofile";
import CustomerShop from "./pages/customer/customerShop";

import AdminLayout from "./components/admin/layout";
import CustomerLayout from "./components/customer/layout";
import Home from "./pages/home";

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
        element={<AdminLayout />}
      >
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="dashboard" 
          element={<AdminDashboard />} />
  

        <Route
          path="products" 
          element={<ProductList />} />

        <Route
          path="products/create"
          element = {<CreateProduct />} />
      </Route>


      {/* =========================
          CUSTOMER
      ========================= */}

      {/* Home */}
      

      <Route path="/customer/register" element={<CreateCustomer />} />
      <Route path="/customer/login" element={<CustomerLogin />} />


      <Route
        path="/"
        element={<Home />}
      />
      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="addresses" element={<CustomerAddresses />} />
        <Route path="dashboard" element={<CustomerDashboard />} />

        <Route path="orders" element={<CustomerOrders />} />
        <Route path="profile" element={<CustomerProfile />} />

        <Route path="shop" element={<CustomerShop />} />

      </Route>

    </Routes>
  );
}