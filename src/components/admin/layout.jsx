import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./sidebar";

function AdminLayout() {
  return (
    <div className="app">

      <Header />

      <div className="app-body">

        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;