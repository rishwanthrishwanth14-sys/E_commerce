import { Routes, Route } from "react-router-dom";
import Login from "./pages/admin/AdminLogin";
import CreateCustomer from "./pages/customer/customerCreate";
import CustomerLogin from "./pages/customer/customerLogin";

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<Login />} />
      <Route path="/customer/register" element={<CreateCustomer/>} />
      <Route path="/customer/login" element={<CustomerLogin/>} />
    </Routes>
  );
}