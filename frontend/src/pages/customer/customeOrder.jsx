import { useEffect, useState } from "react";
import api from "../../service/api";

const CustomerOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/api/my/orders");

            setOrders(response.data.orders || []);

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to fetch orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {

            case "completed":
            case "paid":
            case "delivered":
                return "bg-success";

            case "pending":
                return "bg-warning text-dark";

            case "processing":
            case "shipped":
                return "bg-primary";

            case "cancelled":
            case "failed":
                return "bg-danger";

            default:
                return "bg-secondary";
        }
    };

    if (loading) {
        return (
            <div className="container-fluid py-5 text-center">

                <div className="spinner-border">
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="text-muted mt-2">
                    Loading orders...
                </p>

            </div>
        );
    }

    return (
        <div className="container-fluid py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h3 className="fw-bold mb-1">
                        My Orders
                    </h3>

                    <p className="text-muted mb-0">
                        View and track your orders
                    </p>
                </div>

                <span className="badge bg-dark fs-6">
                    {orders.length} Orders
                </span>

            </div>


            {/* Error */}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            {/* Empty Orders */}
            {!error && orders.length === 0 && (
                <div className="card border-0 shadow-sm">

                    <div className="card-body text-center py-5">

                        <i className="bi bi-bag-x fs-1 text-muted"></i>

                        <h5 className="mt-3">
                            No orders found
                        </h5>

                        <p className="text-muted mb-0">
                            You haven't placed any orders yet.
                        </p>

                    </div>

                </div>
            )}


            {/* Orders */}
            {orders.length > 0 && (
                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">

                        <div className="table-responsive">

                            <table className="table table-hover align-middle mb-0">

                                <thead className="table-light">

                                    <tr>
                                        <th className="px-4">
                                            Order
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Total
                                        </th>

                                        <th>
                                            Payment
                                        </th>

                                        <th>
                                            Order Status
                                        </th>

                                        <th>
                                            Shipping
                                        </th>

                                        <th>
                                            Tracking
                                        </th>

                                        <th className="text-end px-4">
                                            Action
                                        </th>
                                    </tr>

                                </thead>


                                <tbody>

                                    {orders.map((order) => (

                                        <tr key={order.orderId}>

                                            {/* Order Number */}
                                            <td className="px-4">

                                                <div className="fw-semibold">
                                                    {order.orderNumber}
                                                </div>

                                                <small className="text-muted">
                                                    #{order.orderId}
                                                </small>

                                            </td>


                                            {/* Date */}
                                            <td>
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </td>


                                            {/* Total */}
                                            <td>
                                                <strong>
                                                    ₹
                                                    {Number(
                                                        order.totalAmount
                                                    ).toFixed(2)}
                                                </strong>
                                            </td>


                                            {/* Payment Status */}
                                            <td>
                                                <span
                                                    className={`badge ${getStatusClass(
                                                        order.paymentStatus
                                                    )}`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </td>


                                            {/* Order Status */}
                                            <td>
                                                <span
                                                    className={`badge ${getStatusClass(
                                                        order.orderStatus
                                                    )}`}
                                                >
                                                    {order.orderStatus}
                                                </span>
                                            </td>


                                            {/* Shipping Status */}
                                            <td>
                                                <span
                                                    className={`badge ${getStatusClass(
                                                        order.shippingStatus
                                                    )}`}
                                                >
                                                    {order.shippingStatus}
                                                </span>
                                            </td>


                                            {/* Tracking */}
                                            <td>

                                                {order.trackingNumber ? (
                                                    <span className="fw-semibold">
                                                        {order.trackingNumber}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">
                                                        Not available
                                                    </span>
                                                )}

                                            </td>


                                            {/* Action */}
                                            <td className="text-end px-4">

                                                <button
                                                    className="btn btn-sm btn-outline-dark"
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default CustomerOrders;