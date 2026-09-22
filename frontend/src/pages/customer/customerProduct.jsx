import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getCustomerProductById
} from "../../service/customerProductService";
import {
    addToCart
} from "../../service/cartService";
import { getProductImageUrl } from "../../service/imageUrl";

const CustomerProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const result =
                    await getCustomerProductById(productId);

                const data = result.data;

                if (!data || Number(data.status) !== 1) {
                    setError("Product is not available");
                    return;
                }

                setProduct(data);

                const firstImage =
                    data.images?.[0]?.image || data.image;

                setSelectedImage(firstImage || null);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load product"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            setActionLoading(true);
            setMessage("");
            setError("");

            await addToCart(
                Number(productId),
                quantity
            );

            setMessage("Product added to cart");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add product to cart"
            );
        } finally {
            setActionLoading(false);
        }
    };

    const handleBuyNow = () => {
        navigate("/customer/checkout", {
            state: {
                buyNow: true,
                items: [
                    {
                        productId: product.productId,
                        productName: product.productName,
                        price: Number(product.price),
                        quantity
                    }
                ]
            }
        });
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" />
            </div>
        );
    }

    if (error && !product) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    const images =
        product.images?.length
            ? product.images.map((item) => item.image)
            : product.image
                ? [product.image]
                : [];

    return (
        <div>
            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <button
                className="btn btn-link px-0 mb-3"
                onClick={() => navigate("/customer/shop")}
            >
                ← Back to Shop
            </button>

            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        {selectedImage ? (
                            <img
                                src={getProductImageUrl(selectedImage)}
                                alt={product.productName}
                                className="card-img-top"
                                style={{
                                    height: "500px",
                                    objectFit: "contain"
                                }}
                            />
                        ) : (
                            <div
                                className="d-flex align-items-center justify-content-center bg-light"
                                style={{ height: "500px" }}
                            >
                                No Image
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="d-flex gap-2 mt-3 flex-wrap">
                            {images.map((image) => (
                                <button
                                    key={image}
                                    type="button"
                                    className="border rounded p-0 bg-white"
                                    onClick={() =>
                                        setSelectedImage(image)
                                    }
                                >
                                    <img
                                        src={getProductImageUrl(image)}
                                        alt=""
                                        width="80"
                                        height="80"
                                        style={{
                                            objectFit: "cover"
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="col-lg-6">
                    <h2>{product.productName}</h2>

                    <p className="text-muted">
                        SKU: {product.sku}
                    </p>

                    <h3 className="mb-3">
                        ₹
                        {Number(product.price).toFixed(2)}
                    </h3>

                    <p>
                        {product.description ||
                            "No description available."}
                    </p>

                    <p className="text-muted">
                        {product.quantity > 0
                            ? `${product.quantity} available`
                            : "Out of stock"}
                    </p>

                    {product.quantity > 0 && (
                        <>
                            <div className="d-flex align-items-center gap-2 mb-4">
                                <label className="fw-semibold">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    max={product.quantity}
                                    value={quantity}
                                    className="form-control"
                                    style={{ width: "100px" }}
                                    onChange={(e) =>
                                        setQuantity(
                                            Math.min(
                                                product.quantity,
                                                Math.max(
                                                    1,
                                                    Number(
                                                        e.target.value
                                                    ) || 1
                                                )
                                            )
                                        )
                                    }
                                />
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-primary"
                                    disabled={actionLoading}
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus me-2" />
                                    Add to Cart
                                </button>

                                <button
                                    className="btn btn-primary"
                                    disabled={actionLoading}
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerProduct;
