import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerProducts } from "../../service/customerProductService";
import { addToCart } from "../../service/cartService";
import { getProductImageUrl } from "../../service/imageUrl";

const CustomerShop = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [addingProductId, setAddingProductId] = useState(null);
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const result = await getCustomerProducts();
                setProducts(result.data || []);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const handleAddToCart = async (event, product) => {
        event.stopPropagation();

        try {
            setAddingProductId(product.productId);
            setError("");
            setSuccess("");

            await addToCart(product.productId, 1);
            setSuccess(`${product.productName} added to cart`);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to add product to cart"
            );
        } finally {
            setAddingProductId(null);
        }
    };

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border" /></div>;
    }

    return (
        <div>
            <h3 className="mb-4">Shop Products</h3>

            {success && <div className="alert alert-success">{success}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!error && products.length === 0 && (
                <div className="alert alert-info">No products available.</div>
            )}

            <div className="row g-4">
                {products.map((product) => {
                    const image = product.images?.[0]?.image || product.image;

                    return (
                        <div className="col-md-6 col-lg-4" key={product.productId}>
                            <div
                                className="card h-100 border-0 shadow-sm"
                                role="button"
                                onClick={() => navigate(`/customer/product/${product.productId}`)}
                            >
                                {image ? (
                                    <img
                                        src={getProductImageUrl(image)}
                                        className="card-img-top"
                                        alt={product.productName}
                                        style={{ height: "240px", objectFit: "cover" }}
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center bg-light"
                                        style={{ height: "240px" }}>
                                        No Image
                                    </div>
                                )}

                                <div className="card-body">
                                    <h5>{product.productName}</h5>
                                    <h6 className="mb-2">₹{Number(product.price || 0).toLocaleString("en-IN")}</h6>
                                    <p className="text-muted mb-3">
                                        {Number(product.quantity) > 0
                                            ? `${product.quantity} available`
                                            : "Out of stock"}
                                    </p>
                                    <button
                                        type="button"
                                        className="btn btn-primary w-100"
                                        disabled={
                                            Number(product.quantity) <= 0 ||
                                            addingProductId === product.productId
                                        }
                                        onClick={(event) =>
                                            handleAddToCart(event, product)
                                        }
                                    >
                                        {addingProductId === product.productId
                                            ? "Adding..."
                                            : "Add to Cart"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomerShop;
