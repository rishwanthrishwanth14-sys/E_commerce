import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMyOrder } from "../../service/orderService";
import "./customerOrder.css";

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMyOrder();
            setOrders(response.orders || []);
        } catch (error) {
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

    const canReview = (order) => {
        return (
            order.paymentStatus?.toLowerCase() === "paid" &&
            order.orderStatus?.toLowerCase() === "completed" &&
            order.shippingStatus?.toLowerCase() === "delivered"
        );
    };

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

    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString("en-IN");
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="fw-bold mb-1">
                        My Orders
                    </h3>

                    <p className="text-muted mb-0">
                        View your orders and purchased products
                    </p>
                </div>

                <span className="badge bg-dark fs-6">
                    {orders.length} Orders
                </span>
            </div>

            {location.state?.success && (
                <div className="alert alert-success">
                    {location.state.success}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

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

            {orders.length > 0 && (
                <div className="d-flex flex-column gap-4">
                    {orders.map((order) => (
                        <div
                            className="card border-0 shadow-sm"
                            key={order.orderId}
                        >
                            <div className="card-header bg-white p-3">
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-3">
                                        <small className="text-muted d-block">
                                            Order number
                                        </small>

                                        <strong>
                                            {order.orderNumber}
                                        </strong>

                                        <div className="small text-muted">
                                            Order ID: #{order.orderId}
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <small className="text-muted d-block">
                                            Order date
                                        </small>

                                        <span>
                                            {order.createdAt
                                                ? new Date(
                                                    order.createdAt
                                                ).toLocaleDateString("en-IN")
                                                : "-"}
                                        </span>
                                    </div>

                                    <div className="col-md-2">
                                        <small className="text-muted d-block">
                                            Order total
                                        </small>

                                        <strong>
                                            ₹{formatPrice(order.totalAmount)}
                                        </strong>
                                    </div>

                                    <div className="col-md-2">
                                        <small className="text-muted d-block">
                                            Payment
                                        </small>

                                        <span
                                            className={`badge ${getStatusClass(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            {order.paymentStatus || "Unknown"}
                                        </span>
                                    </div>

                                    <div className="col-md-3">
                                        <small className="text-muted d-block">
                                            Order status
                                        </small>

                                        <span
                                            className={`badge ${getStatusClass(
                                                order.orderStatus
                                            )} me-2`}
                                        >
                                            {order.orderStatus || "Unknown"}
                                        </span>

                                        <span
                                            className={`badge ${getStatusClass(
                                                order.shippingStatus
                                            )}`}
                                        >
                                            {order.shippingStatus || "Unknown"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-3">
                                <h6 className="fw-bold mb-3">
                                    Products in this order
                                </h6>

                                {!order.products ||
                                order.products.length === 0 ? (
                                    <p className="text-muted mb-0">
                                        No products found for this order.
                                    </p>
                                ) : (
                                    <div className="d-flex flex-column gap-3">
                                        {order.products.map((product) => (
                                            <div
                                                key={`${order.orderId}-${product.productId}`}
                                                className="border rounded p-3"
                                            >
                                                <div className="row g-3 align-items-center">
                                                    <div className="col-md-5">
                                                        <h6 className="fw-semibold mb-1">
                                                            {product.productName}
                                                        </h6>

                                                        <small className="text-muted d-block">
                                                            SKU: {product.sku || "-"}
                                                        </small>

                                                        <small className="text-muted d-block">
                                                            Product ID: {product.productId}
                                                        </small>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <small className="text-muted d-block">
                                                            Unit price
                                                        </small>

                                                        <strong>
                                                            ₹{formatPrice(product.price)}
                                                        </strong>
                                                    </div>

                                                    <div className="col-md-2">
                                                        <small className="text-muted d-block">
                                                            Quantity
                                                        </small>

                                                        <strong>
                                                            {product.quantity}
                                                        </strong>
                                                    </div>

                                                    <div className="col-md-3">
                                                        <small className="text-muted d-block">
                                                            Item total
                                                        </small>

                                                        <strong>
                                                            ₹{formatPrice(product.total)}
                                                        </strong>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-wrap gap-2 mt-3">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() =>
                                                            navigate(
                                                                `/customer/review/${product.productId}`
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-star me-1"></i>
                                                        View Reviews
                                                    </button>

                                                    {canReview(order) && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-primary"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/customer/review/${product.productId}?write=true`
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-pencil-square me-1"></i>
                                                            Write Review
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="card-footer bg-white">
                                <small className="text-muted">
                                    Tracking number:{" "}
                                    <strong>
                                        {order.trackingNumber || "Not available"}
                                    </strong>
                                </small>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerOrders;
