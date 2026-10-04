import { Outlet } from "react-router-dom";
import Navbar from "../customer/navbar";
import CustomerSidebar from "../customer/sidebar";
import "./layout.css";

const CustomerLayout = () => {
    return (
        <div className="customer-layout">

            <CustomerSidebar />

            <div className="customer-content">

                <Navbar />

                <main className="customer-main">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default CustomerLayout;