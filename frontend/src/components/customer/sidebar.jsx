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

        navigate("/customer/login", {
            replace: true
        });

    };

    const menuItems = [
        {
            name: "Dashboard",
            path: "dashboard",
            icon: "bi-grid"
        },
        {
            name: "My Orders",
            path: "orders",
            icon: "bi-bag"
        },
        {
            name: "My Profile",
            path: "profile",
            icon: "bi-person"
        },
        {
            name: "Addresses",
            path: "addresses",
            icon: "bi-geo-alt"
        },
        {
            name: "Shop",
            path: "shop",
            icon: "bi-shop"
        },
        {
            name: "Cart",
            path: "cart",
            icon: "bi-cart3"
        }
    ];

    const customerName =
        [
            profile?.firstName,
            profile?.lastName
        ]
            .filter(Boolean)
            .join(" ") || "Customer";


    return (

        <aside
            style={{
        width: "clamp(200px, 20vw, 260px)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,

        backgroundColor: "#ffffff",
        borderRight: "1px solid #e5e7eb",

        padding: "20px 15px",

        display: "flex",
        flexDirection: "column",

        overflowY: "auto",

        zIndex: 1000
    }}
        >

            {/* LOGO */}

            <div
                style={{
                    padding: "10px 8px 25px"
                }}
            >

                <div
                    className="d-flex align-items-center gap-2"
                >

                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            backgroundColor: "#0d6efd",
                            color: "#ffffff",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <i className="bi bi-bag-fill"></i>
                    </div>

                    <div>

                        <h5 className="fw-bold mb-0">
                            ShopHub
                        </h5>

                        <small className="text-muted">
                            Customer Panel
                        </small>

                    </div>

                </div>

            </div>


            {/* MENU TITLE */}

            <small
                style={{
                    textTransform: "uppercase",
                    color: "#999",
                    fontSize: "11px",
                    fontWeight: "600",
                    padding: "0 10px",
                    marginBottom: "8px"
                }}
            >
                Menu
            </small>


            {/* MENU */}

            <nav
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }}
            >

                {menuItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}

                        style={({ isActive }) => ({
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "11px 12px",
                            borderRadius: "7px",
                            textDecoration: "none",
                            fontSize: "14px",

                            backgroundColor: isActive
                                ? "#eaf2ff"
                                : "transparent",

                            color: isActive
                                ? "#0d6efd"
                                : "#555",

                            fontWeight: isActive
                                ? "600"
                                : "400"
                        })}
                    >

                        <i
                            className={`bi ${item.icon}`}
                            style={{
                                fontSize: "17px",
                                width: "20px",
                                textAlign: "center"
                            }}
                        ></i>

                        <span>
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </nav>


            {/* SPACE */}

            <div
                style={{
                    flex: 1,
                    minHeight: "25px"
                }}
            ></div>


            {/* PROFILE */}

            <div
                style={{
                    borderTop: "1px solid #eeeeee",
                    paddingTop: "15px"
                }}
            >

                <div
                    className="d-flex align-items-center gap-2 px-2 mb-3"
                >

                    <div
                        style={{
                            width: "42px",
                            height: "42px",
                            backgroundColor: "#f1f3f5",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <i
                            className="bi bi-person"
                            style={{
                                fontSize: "18px",
                                color: "#6c757d"
                            }}
                        ></i>
                    </div>

                    <div
                        style={{
                            minWidth: 0
                        }}
                    >

                        <div
                            style={{
                                fontWeight: "600",
                                color: "#212529",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}
                        >
                            {customerName}
                        </div>

                        <small
                            style={{
                                color: "#888",
                                fontSize: "12px"
                            }}
                        >
                            Customer
                        </small>

                    </div>

                </div>


                {/* LOGOUT */}

                <button
                    type="button"
                    onClick={handleLogout}

                    style={{
                        width: "100%",
                        border: "none",
                        backgroundColor: "transparent",
                        padding: "11px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        color: "#dc3545",
                        borderRadius: "7px",
                        fontSize: "14px",
                        textAlign: "left",
                        cursor: "pointer"
                    }}
                >

                    <i className="bi bi-box-arrow-left"></i>

                    <span>
                        Sign Out
                    </span>

                </button>

            </div>

        </aside>

    );
};

export default CustomerSidebar;