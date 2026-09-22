import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../service/adminService";

function Sidebar() {

    const [profile, setProfile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getMyProfile()
            .then((result) => {
                setProfile(result.data);
            })
            .catch(() => {});
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/admin/login");
    };

    return (
        <aside className="sidebar">

            <p className="sidebar-title">
                MAIN
            </p>

            <NavLink
                to="/admin/dashboard"
                className="sidebar-link"
            >
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
            </NavLink>


            <p className="sidebar-title">
                PRODUCT MANAGEMENT
            </p>

            <NavLink
                to="/admin/products"
                className="sidebar-link"
            >
                <i className="bi bi-box-seam"></i>
                <span>Products</span>
            </NavLink>

            <NavLink
                to="/admin/categories"
                className="sidebar-link"
            >
                <i className="bi bi-tags"></i>
                <span>Categories</span>
            </NavLink>


            <p className="sidebar-title">
                ORDER MANAGEMENT
            </p>

            <NavLink
                to="/admin/orders"
                className="sidebar-link"
            >
                <i className="bi bi-cart3"></i>
                <span>Orders</span>
            </NavLink>


            <p className="sidebar-title">
                CUSTOMER MANAGEMENT
            </p>

            <NavLink
                to="/customer/register"
                className="sidebar-link"
            >
                <i className="bi bi-person-plus"></i>
                <span>Add Customer</span>
            </NavLink>

            <NavLink
                to="/admin/customers"
                className="sidebar-link"
            >
                <i className="bi bi-people"></i>
                <span>Customers</span>
            </NavLink>


            <div className="sidebar-bottom">

                {/* Profile information */}
                <div className="sidebar-profile">

                    <strong>
                        {profile ? `${profile.firstname || ""} ${profile.lastname || ""}`.trim() : "Admin"}
                    </strong>

                    <small>
                        {profile?.email}
                    </small>

                </div>


                {/* Logout */}
                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                </button>

            </div>

        </aside>
    );
}

export default Sidebar;