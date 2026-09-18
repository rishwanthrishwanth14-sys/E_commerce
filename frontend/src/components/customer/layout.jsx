import { Outlet } from "react-router-dom";
import Navbar from "../customer/navbar"
import CustomerSidebar from "../customer/sidebar";

const CustomerLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* Sidebar */}
      <CustomerSidebar />

      {/* Main Area */}
      <div className="flex-grow-1"
      style={{
          marginLeft: "260px",
          minHeight: "100vh",
          padding: "24px"
        }}  >

        <Navbar />

        <main className="p-4">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CustomerLayout;