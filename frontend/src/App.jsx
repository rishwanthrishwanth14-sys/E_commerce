import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";

import Login from "./pages/homePage/admin/AdminLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import ProductList from "./pages/admin/ProductList";
import CreateProduct from "./pages/admin/CreateProduct";
import Categories from "./pages/admin/categories";
import AdminOrders from "./pages/admin/orders";
import AdminCustomers from "./pages/admin/customers";

import CreateCustomer from "./pages/homePage/customer/customerCreate";
import CustomerLogin from "./pages/homePage/customer/customerLogin";
import CustomerDashboard from "./pages/customer/customerdashboard";
import CustomerAddresses from "./pages/customer/customerAddress";
import CustomerOrders from "./pages/customer/customeOrder";
import CustomerProfile from "./pages/customer/customerprofile";
import CustomerShop from "./pages/customer/customerShop";
import CustomerProduct from "./pages/customer/customerProduct";
import CustomerCart from "./pages/customer/customerCart";
import CustomerCheckout from "./pages/customer/customerCheckout";
import AdminLayout from "./components/admin/layout";
import CustomerLayout from "./components/customer/layout";


import PublicRoutes from "./components/auth/publicRoutes";
import AdminRoutes from "./components/auth/adminProtuctRoutes";
import CustomerRoutes from "./components/auth/customerProtuctionRoutes";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicRoutes />} >
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/customer/register" element={<CreateCustomer />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
      </Route>

      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminLayout />} >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products/create" element={<CreateProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
        </Route>
      </Route>

      <Route element={<CustomerRoutes />}>
        <Route path="/customer" element={<CustomerLayout />} >
          <Route index element={<CustomerDashboard />} />
          <Route path="dashboard" element={<CustomerDashboard />} />
          <Route path="addresses" element={<CustomerAddresses />} />
          <Route path="orders" element={<CustomerOrders />} />
          <Route path="profile" element={<CustomerProfile />} />
          <Route path="shop" element={<CustomerShop />} />
          <Route path="product/:productId" element={<CustomerProduct />} />
          <Route path="cart" element={<CustomerCart />} />
          <Route path="checkout" element={<CustomerCheckout />} />
        </Route>
      </Route>
    </Routes>
  );
}