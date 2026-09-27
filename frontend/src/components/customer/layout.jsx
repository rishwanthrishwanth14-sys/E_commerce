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
                    marginLeft:
                        window.innerWidth <= 768
                            ? "0"
                            : "260px",

                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <main
                    style={{
                        padding: "30px",

                        paddingBottom:
                            window.innerWidth <= 768
                                ? "90px"
                                : "30px"
                    }}
                >

                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default CustomerLayout;