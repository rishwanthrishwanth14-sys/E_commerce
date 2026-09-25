import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="app">

      <Header />

      <div className="app-body">

        <Sidebar />
        <div className="mobile-bottom-nav">

          <a href="/admin/dashboard">
            <i className="bi bi-house"></i>
            <span>Home</span>
          </a>

          <a href="/admin/products">
            <i className="bi bi-box"></i>
            <span>Products</span>
          </a>

          <a href="/admin/categories">
            <i className="bi bi-grid"></i>
            <span>Categories</span>
          </a>

          <a href="/admin/orders">
            <i className="bi bi-cart"></i>
            <span>Orders</span>
          </a>

        </div>

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;