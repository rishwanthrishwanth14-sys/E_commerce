import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfile } from "../../service/customerService";

const CustomerSidebar = () => {

    const [profile, setProfile] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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


    // Detect screen size
    useEffect(() => {

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };

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
            icon: "bi-house"
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
        },
        {
            name: "Orders",
            path: "orders",
            icon: "bi-box-seam"
        }
    ];


    const sidebarItems = [
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


    /*
    =========================================
    MOBILE BOTTOM NAV
    =========================================
    */

    if (isMobile) {

        return (

            <>

                <nav
                    style={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "70px",
                        backgroundColor: "#ffffff",
                        borderTop: "1px solid #e5e7eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        zIndex: 2000,
                        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
                    }}
                >

                    {menuItems.map((item) => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                flex: 1,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "4px",
                                textDecoration: "none",

                                color: isActive
                                    ? "#0d6efd"
                                    : "#777",

                                fontSize: "11px",
                                fontWeight: isActive
                                    ? "600"
                                    : "400"
                            })}
                        >

                            <i
                                className={`bi ${item.icon}`}
                                style={{
                                    fontSize: "20px"
                                }}
                            ></i>

                            <span>
                                {item.name}
                            </span>

                        </NavLink>

                    ))}
                    <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                            flex: 1,
                            height: "100%",
                            border: "none",
                            backgroundColor: "transparent",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "4px",
                            color: "#dc3545",
                            fontSize: "11px",
                            cursor: "pointer"
                        }}
                    >
                        <i
                            className="bi bi-box-arrow-right"
                            style={{
                                fontSize: "20px"
                            }}
                        ></i>

                        <span>
                            Logout
                        </span>
                    </button>

                </nav>

            </>

        );
    }


    /*
    =========================================
    DESKTOP SIDEBAR
    =========================================
    */

    return (

        <aside
            style={{
                width: "260px",
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

                {sidebarItems.map((item) => (

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
                    flex: 1
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


                    <div>

                        <div
                            style={{
                                fontWeight: "600",
                                color: "#212529"
                            }}
                        >
                            {customerName}
                        </div>

                        <small
                            style={{
                                color: "#888"
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