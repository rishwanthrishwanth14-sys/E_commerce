import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart } from "../../service/cartService";
import { getAddresses } from "../../service/addressService";
import { placeOrder } from "../../service/checkoutService";

const CustomerCheckout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const buyNow = Boolean(location.state?.buyNow);
    const buyNowItems = location.state?.items || [];

    const [items, setItems] = useState(buyNowItems);
    const [addresses, setAddresses] = useState([]);
    const [billingAddressId, setBillingAddressId] =
        useState("");
    const [shippingAddressId, setShippingAddressId] =
        useState("");
    const [paymentMethod, setPaymentMethod] =
        useState("cod");
    const [customerComment, setCustomerComment] =
        useState("");

    const [loading, setLoading] = useState(!buyNow);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);

                const addressResult =
                    await getAddresses();

                const loadedAddresses =
                    addressResult.data || [];

                setAddresses(loadedAddresses);

                if (loadedAddresses[0]) {
                    setBillingAddressId(
                        String(
                            loadedAddresses[0].addressId
                        )
                    );
                    setShippingAddressId(
                        String(
                            loadedAddresses[0].addressId
                        )
                    );
                }

                if (!buyNow) {
                    const cartResult =
                        await getCart();

                    const cartItems =
                        cartResult.data?.items || [];

                    setItems(
                        cartItems.map((item) => ({
                            productId:
                                item.productId,
                            productName:
                                item.productName,
                            price: Number(item.price),
                            quantity: Number(
                                item.quantity
                            )
                        }))
                    );
                }
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load checkout"
                );
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [buyNow]);

    const subtotal = useMemo(
        () =>
            items.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price) *
                        Number(item.quantity),
                0
            ),
        [items]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!items.length) {
            setError("There are no items to order.");
            return;
        }

        if (!billingAddressId || !shippingAddressId) {
            setError(
                "Please add/select a billing and shipping address."
            );
            return;
        }

        try {
            setSubmitting(true);
            setError("");

            const result = await placeOrder({
                billingAddressId: Number(
                    billingAddressId
                ),
                shippingAddressId: Number(
                    shippingAddressId
                ),
                items: items.map((item) => ({
                    productId: Number(
                        item.productId
                    ),
                    quantity: Number(
                        item.quantity
                    )
                })),
                shippingAmount: 0,
                paymentMethod,
                customerComment,
                clearCart: !buyNow
            });

            navigate("/customer/orders", {
                replace: true,
                state: {
                    success:
                        result.message ||
                        "Order placed successfully"
                }
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" />
            </div>
        );
    }

    return (
        <div>
            <h3 className="mb-4">
                {buyNow ? "Buy Now" : "Checkout"}
            </h3>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {!addresses.length && (
                <div className="alert alert-warning">
                    You need a saved address before placing
                    an order.
                    <button
                        className="btn btn-sm btn-primary ms-3"
                        onClick={() =>
                            navigate(
                                "/customer/addresses"
                            )
                        }
                    >
                        Add Address
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    Delivery Address
                                </h5>

                                {addresses.length > 0 ? (
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Billing Address
                                            </label>

                                            <select
                                                className="form-select"
                                                value={
                                                    billingAddressId
                                                }
                                                onChange={(e) =>
                                                    setBillingAddressId(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                            >
                                                {addresses.map(
                                                    (
                                                        address
                                                    ) => (
                                                        <option
                                                            key={
                                                                address.addressId
                                                            }
                                                            value={
                                                                address.addressId
                                                            }
                                                        >
                                                            {address.firstName}{" "}
                                                            {
                                                                address.lastName
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                address.address1
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">
                                                Shipping Address
                                            </label>

                                            <select
                                                className="form-select"
                                                value={
                                                    shippingAddressId
                                                }
                                                onChange={(e) =>
                                                    setShippingAddressId(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                            >
                                                {addresses.map(
                                                    (
                                                        address
                                                    ) => (
                                                        <option
                                                            key={
                                                                address.addressId
                                                            }
                                                            value={
                                                                address.addressId
                                                            }
                                                        >
                                                            {address.firstName}{" "}
                                                            {
                                                                address.lastName
                                                            }{" "}
                                                            -{" "}
                                                            {
                                                                address.address1
                                                            }
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="mb-3">
                                    Payment
                                </h5>

                                <select
                                    className="form-select mb-3"
                                    value={paymentMethod}
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="cod">
                                        Cash on Delivery
                                    </option>
                                </select>

                                <label className="form-label">
                                    Customer Comment
                                </label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={customerComment}
                                    onChange={(e) =>
                                        setCustomerComment(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5>Order Summary</h5>

                                {items.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="d-flex justify-content-between py-2"
                                    >
                                        <span>
                                            {item.productName}{" "}
                                            ×{" "}
                                            {item.quantity}
                                        </span>

                                        <span>
                                            ₹
                                            {(
                                                Number(
                                                    item.price
                                                ) *
                                                Number(
                                                    item.quantity
                                                )
                                            ).toFixed(
                                                2
                                            )}
                                        </span>
                                    </div>
                                ))}

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <strong>
                                        Subtotal
                                    </strong>
                                    <strong>
                                        ₹
                                        {subtotal.toFixed(
                                            2
                                        )}
                                    </strong>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <span>Shipping</span>
                                    <span>₹0.00</span>
                                </div>

                                <div className="d-flex justify-content-between mt-3">
                                    <strong>Total</strong>
                                    <strong>
                                        ₹
                                        {subtotal.toFixed(
                                            2
                                        )}
                                    </strong>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 mt-4"
                                    disabled={
                                        submitting ||
                                        !items.length ||
                                        !addresses.length
                                    }
                                >
                                    {submitting
                                        ? "Placing Order..."
                                        : "Place Order"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CustomerCheckout;
