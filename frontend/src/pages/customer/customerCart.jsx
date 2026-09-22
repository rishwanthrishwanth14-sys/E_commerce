import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../../service/cartService";
import { getProductImageUrl } from "../../service/imageUrl";

const CustomerCart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState({
        items: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCart = async () => {
        try {
            setLoading(true);
            const result = await getCart();

            setCart(
                result.data || {
                    items: []
                }
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load cart"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialCart = async () => {
            await loadCart();
        };

        loadInitialCart();
    }, []);

    const subtotal = useMemo(
        () =>
            cart.items.reduce(
                (sum, item) =>
                    sum +
                    Number(item.price) *
                        Number(item.quantity),
                0
            ),
        [cart.items]
    );

    const changeQuantity = async (item, quantity) => {
        if (quantity < 1) return;

        try {
            const result = await updateCartItem(
                item.cartItemId,
                quantity
            );

            setCart(result.data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to update cart"
            );
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            await removeCartItem(cartItemId);
            await loadCart();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to remove item"
            );
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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">My Cart</h3>
                    <p className="text-muted mb-0">
                        Review your items before checkout.
                    </p>
                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/customer/shop")
                    }
                >
                    Continue Shopping
                </button>

                {cart.items.length > 0 && (
                    <button
                        className="btn btn-outline-danger ms-2"
                        onClick={async () => {
                            try {
                                await clearCart();
                                await loadCart();
                            } catch (err) {
                                setError(
                                    err.response?.data?.message ||
                                    "Failed to clear cart"
                                );
                            }
                        }}
                    >
                        Clear Cart
                    </button>
                )}
            </div>

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {cart.items.length === 0 ? (
                <div className="card border-0 shadow-sm">
                    <div className="card-body text-center py-5">
                        <i className="bi bi-cart-x fs-1 text-muted" />
                        <h5 className="mt-3">
                            Your cart is empty
                        </h5>
                        <button
                            className="btn btn-primary mt-2"
                            onClick={() =>
                                navigate("/customer/shop")
                            }
                        >
                            Shop Now
                        </button>
                    </div>
                </div>
            ) : (
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm">
                            <div className="table-responsive">
                                <table className="table align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th />
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {cart.items.map(
                                            (item) => (
                                                <tr
                                                    key={
                                                        item.cartItemId
                                                    }
                                                >
                                                    <td>
                                                        <div className="d-flex align-items-center gap-3">
                                                            {item.image ? (
                                                                <img
                                                                    src={getProductImageUrl(
                                                                        item.image
                                                                    )}
                                                                    alt={
                                                                        item.productName
                                                                    }
                                                                    width="70"
                                                                    height="70"
                                                                    style={{
                                                                        objectFit:
                                                                            "cover"
                                                                    }}
                                                                    className="rounded"
                                                                />
                                                            ) : (
                                                                <div
                                                                    className="bg-light rounded d-flex align-items-center justify-content-center"
                                                                    style={{
                                                                        width: 70,
                                                                        height: 70
                                                                    }}
                                                                >
                                                                    -
                                                                </div>
                                                            )}

                                                            <div>
                                                                <div className="fw-semibold">
                                                                    {
                                                                        item.productName
                                                                    }
                                                                </div>
                                                                <small className="text-muted">
                                                                    {
                                                                        item.sku
                                                                    }
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        ₹
                                                        {Number(
                                                            item.price
                                                        ).toFixed(
                                                            2
                                                        )}
                                                    </td>

                                                    <td>
                                                        <div className="input-group input-group-sm" style={{ width: 130 }}>
                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                onClick={() =>
                                                                    changeQuantity(
                                                                        item,
                                                                        Number(item.quantity) -
                                                                            1
                                                                    )
                                                                }
                                                                disabled={
                                                                    Number(
                                                                        item.quantity
                                                                    ) <=
                                                                    1
                                                                }
                                                            >
                                                                -
                                                            </button>

                                                            <input
                                                                className="form-control text-center"
                                                                value={
                                                                    item.quantity
                                                                }
                                                                readOnly
                                                            />

                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                onClick={() =>
                                                                    changeQuantity(
                                                                        item,
                                                                        Number(item.quantity) +
                                                                            1
                                                                    )
                                                                }
                                                                disabled={
                                                                    Number(
                                                                        item.quantity
                                                                    ) >=
                                                                    Number(
                                                                        item.availableQuantity
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </td>

                                                    <td className="fw-semibold">
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
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                removeItem(
                                                                    item.cartItemId
                                                                )
                                                            }
                                                        >
                                                            <i className="bi bi-trash" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5>Order Summary</h5>

                                <div className="d-flex justify-content-between mt-4">
                                    <span>Subtotal</span>
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

                                <hr />

                                <div className="d-flex justify-content-between">
                                    <strong>Total</strong>
                                    <strong>
                                        ₹
                                        {subtotal.toFixed(
                                            2
                                        )}
                                    </strong>
                                </div>

                                <button
                                    className="btn btn-primary w-100 mt-4"
                                    onClick={() =>
                                        navigate(
                                            "/customer/checkout"
                                        )
                                    }
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerCart;
