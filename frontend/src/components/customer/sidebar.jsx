import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../service/customerService";

const CustomerSidebar = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const result = await getMyProfile();
                setProfile(result.data || null);
            } catch {
                setProfile(null);
            }
        };

        loadProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/customer/login", { replace: true });
    };

    const menuItems = [
        { name: "Dashboard", path: "dashboard", icon: "bi-grid" },
        { name: "My Orders", path: "orders", icon: "bi-bag" },
        { name: "My Profile", path: "profile", icon: "bi-person" },
        { name: "Addresses", path: "addresses", icon: "bi-geo-alt" },
        { name: "Shop", path: "shop", icon: "bi-shop" },
        { name: "Cart", path: "cart", icon: "bi-cart3" }
    ];

    const customerName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ") || "Customer";

    return (
        <aside
            className="bg-white border-end vh-100 d-flex flex-column p-3 position-fixed top-0 start-0"
            style={{
                width: "260px",
                zIndex: 1000,
                overflowY: "auto"
            }}
        >
            <div className="px-2 py-3 mb-4 flex-shrink-0">
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "42px", height: "42px" }}
                    >
                        <i className="bi bi-bag-fill fs-5"></i>
                    </div>
                    <div>
                        <h5 className="fw-bold mb-0">ShopHub</h5>
                        <small className="text-muted">Customer Panel</small>
                    </div>
                </div>
            </div>

            <small className="text-uppercase text-muted fw-semibold px-2 mb-2 flex-shrink-0">
                Menu
            </small>

            <nav className="d-flex flex-column gap-1 flex-shrink-0">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `text-decoration-none rounded-3 px-3 py-3 d-flex align-items-center gap-3 ${
                                isActive
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-secondary"
                            }`
                        }
                    >
                        <i className={`bi ${item.icon} fs-5`}></i>
                        <span className="fw-medium">{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="flex-grow-1" style={{ minHeight: "24px" }}></div>

            <div className="border-top pt-3 flex-shrink-0">
                <div className="d-flex align-items-center gap-2 px-2 mb-3">
                    <div
                        className="bg-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "42px", height: "42px" }}
                    >
                        <i className="bi bi-person fs-5 text-secondary"></i>
                    </div>
                    <div className="overflow-hidden">
                        <div className="fw-semibold text-dark text-truncate">
                            {customerName}
                        </div>
                        <small className="text-muted">Customer</small>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    type="button"
                    className="btn btn-light w-100 text-danger d-flex align-items-center gap-3 px-3 py-2"
                >
                    <i className="bi bi-box-arrow-left"></i>
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default CustomerSidebar;
