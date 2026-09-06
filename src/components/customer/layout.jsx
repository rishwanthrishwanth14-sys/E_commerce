import { Outlet } from "react-router-dom";
import Sidebar from "../customer/sidebar"
import Navbar from "../customer/navbar"

const CustomerLayout = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-grow-1">

        <Navbar />

        <main className="p-4">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default CustomerLayout;