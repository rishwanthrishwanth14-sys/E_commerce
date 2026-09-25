import { useEffect, useState } from "react";
import {
    getAdminOrders,
    updateAdminOrderStatus
} from "../../service/adminOrderService";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [savingId, setSavingId] = useState(null);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getAdminOrders();
            setOrders(result.orders || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load orders"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const updateStatus = async (order) => {
        try {
            setSavingId(order.orderId);

            await updateAdminOrderStatus(
                order.orderId,
                {
                    orderStatus:
                        order.orderStatus,
                    shippingStatus:
                        order.shippingStatus,
                    paymentStatus:
                        order.paymentStatus,
                    trackingNumber:
                        order.trackingNumber
                }
            );

            await loadOrders();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update order"
            );
        } finally {
            setSavingId(null);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <h3 className="mb-4">Orders</h3>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="alert alert-info">
                    No orders found.
                </div>
            ) : (
                <div className="card border-0 shadow-sm">
                    <div className="table-responsive">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Order</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Order Status</th>
                                    <th>Shipping</th>
                                    <th>Tracking</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>
                                            <strong>
                                                {order.orderNumber}
                                            </strong>
                                            <div className="small text-muted">
                                                {order.createdAt
                                                    ? new Date(
                                                        order.createdAt
                                                    ).toLocaleString()
                                                    : "-"}
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                {order.customerName ||
                                                    order.customerId}
                                            </div>
                                            <small className="text-muted">
                                                {
                                                    order.customerEmail
                                                }
                                            </small>
                                        </td>

                                        <td>
                                            ₹
                                            {Number(
                                                order.totalAmount
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={
                                                    order.paymentStatus
                                                }
                                                onChange={(e) =>
                                                    setOrders(
                                                        (prev) =>
                                                            prev.map(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.orderId ===
                                                                    order.orderId
                                                                        ? {
                                                                            ...item,
                                                                            paymentStatus:
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        }
                                                                        : item
                                                            )
                                                    )
                                                }
                                            >
                                                <option value="pending">
                                                    pending
                                                </option>
                                                <option value="paid">
                                                    paid
                                                </option>
                                                <option value="failed">
                                                    failed
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={
                                                    order.orderStatus
                                                }
                                                onChange={(e) =>
                                                    setOrders(
                                                        (prev) =>
                                                            prev.map(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.orderId ===
                                                                    order.orderId
                                                                        ? {
                                                                            ...item,
                                                                            orderStatus:
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        }
                                                                        : item
                                                            )
                                                    )
                                                }
                                            >
                                                <option value="pending">
                                                    pending
                                                </option>
                                                <option value="processing">
                                                    processing
                                                </option>
                                                <option value="shipped">
                                                    shipped
                                                </option>
                                                <option value="completed">
                                                    completed
                                                </option>
                                                <option value="cancelled">
                                                    cancelled
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={
                                                    order.shippingStatus
                                                }
                                                onChange={(e) =>
                                                    setOrders(
                                                        (prev) =>
                                                            prev.map(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.orderId ===
                                                                    order.orderId
                                                                        ? {
                                                                            ...item,
                                                                            shippingStatus:
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        }
                                                                        : item
                                                            )
                                                    )
                                                }
                                            >
                                                <option value="pending">
                                                    pending
                                                </option>
                                                <option value="processing">
                                                    processing
                                                </option>
                                                <option value="shipped">
                                                    shipped
                                                </option>
                                                <option value="delivered">
                                                    delivered
                                                </option>
                                            </select>
                                        </td>

                                        <td>
                                            <input
                                                className="form-control form-control-sm"
                                                value={
                                                    order.trackingNumber ||
                                                    ""
                                                }
                                                onChange={(e) =>
                                                    setOrders(
                                                        (prev) =>
                                                            prev.map(
                                                                (
                                                                    item
                                                                ) =>
                                                                    item.orderId ===
                                                                    order.orderId
                                                                        ? {
                                                                            ...item,
                                                                            trackingNumber:
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                        }
                                                                        : item
                                                            )
                                                    )
                                                }
                                            />
                                        </td>

                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                disabled={
                                                    savingId ===
                                                    order.orderId
                                                }
                                                onClick={() =>
                                                    updateStatus(
                                                        order
                                                    )
                                                }
                                            >
                                                {savingId ===
                                                order.orderId
                                                    ? "Saving..."
                                                    : "Save"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
