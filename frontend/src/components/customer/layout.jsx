import { Outlet } from "react-router-dom";
import Navbar from "../customer/navbar";
import CustomerSidebar from "../customer/sidebar";

const CustomerLayout = () => {

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundColor: "#f5f7fa"
            }}
        >

            <CustomerSidebar />

            <div
                style={{
                    marginLeft: "clamp(200px, 20vw, 260px)",
                    minHeight: "100vh",
                    width: "calc(100% - clamp(200px, 20vw, 260px))"
                }}
            >

                <Navbar />

                <main
                    style={{
                        padding: "30px"
                    }}
                >
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default CustomerLayout;