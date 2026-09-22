import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../service/customerService";
import { getMyOrder } from "../../service/orderService";
import { getAddresses } from "../../service/addressService";

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const [profileResult, ordersResult, addressResult] =
                    await Promise.all([
                        getMyProfile(),
                        getMyOrder(),
                        getAddresses()
                    ]);

                setProfile(profileResult.data);
                setOrders(ordersResult.orders || []);
                setAddresses(addressResult.data || []);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" />
                <p className="text-muted mt-3">Loading your dashboard...</p>
            </div>
        );
    }

    const pending = orders.filter((o) =>
        ["pending", "processing", "shipped"].includes(
            String(o.orderStatus || "").toLowerCase()
        )
    ).length;

    const completed = orders.filter((o) =>
        ["completed", "delivered"].includes(
            String(o.orderStatus || "").toLowerCase()
        )
    ).length;

    const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.totalAmount || 0),
        0
    );

    const recentOrders = orders.slice(0, 5);
    const displayName = [profile?.firstName, profile?.lastName]
        .filter(Boolean)
        .join(" ") || "Customer";

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-4">
                <h3>Welcome back, {displayName}</h3>
                <p className="text-muted">
                    Here's what's happening with your account.
                </p>
            </div>

            <div className="row g-4 mb-4">
                {[
                    ["Total Orders", orders.length, "bi-box-seam"],
                    ["Pending Orders", pending, "bi-clock"],
                    ["Completed Orders", completed, "bi-check-circle"],
                    ["Total Spent", `₹${totalSpent.toFixed(2)}`, "bi-currency-rupee"]
                ].map(([title, value, icon]) => (
                    <div className="col-md-6 col-xl-3" key={title}>
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted mb-2">{title}</p>
                                    <h3 className="mb-0">{value}</h3>
                                </div>
                                <i className={`bi ${icon} fs-1 text-primary`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3 d-flex justify-content-between">
                    <h5 className="mb-0">Recent Orders</h5>
                    <button
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => navigate("/customer/orders")}
                    >
                        View All
                    </button>
                </div>

                <div className="card-body p-0">
                    {recentOrders.length === 0 ? (
                        <div className="text-center text-muted py-5">
                            No orders found.
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Order</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>#{order.orderNumber || order.orderId}</td>
                                            <td>
                                                {order.createdAt
                                                    ? new Date(order.createdAt).toLocaleDateString()
                                                    : "-"}
                                            </td>
                                            <td>₹{Number(order.totalAmount || 0).toFixed(2)}</td>
                                            <td>{order.paymentStatus || "-"}</td>
                                            <td>{order.orderStatus || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Account Information</h5>
                        </div>
                        <div className="card-body">
                            <p><strong>Name:</strong> {displayName}</p>
                            <p><strong>Email:</strong> {profile?.email || "-"}</p>
                            <p><strong>Phone:</strong> {profile?.phoneNumber || "-"}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/customer/profile")}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">My Address</h5>
                        </div>
                        <div className="card-body">
                            {addresses[0] ? (
                                <>
                                    <p className="mb-1">
                                        <strong>
                                            {addresses[0].firstName} {addresses[0].lastName}
                                        </strong>
                                    </p>
                                    <p className="text-muted">
                                        {addresses[0].address1}<br />
                                        {addresses[0].city}, {addresses[0].state}<br />
                                        {addresses[0].postcode}, {addresses[0].country}
                                    </p>
                                </>
                            ) : (
                                <p className="text-muted">No saved address.</p>
                            )}
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate("/customer/addresses")}
                            >
                                Manage Addresses
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
