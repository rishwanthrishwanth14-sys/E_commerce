import { useEffect, useState } from "react";
import { getCustomerProducts } from "../../service/customerProductService";

const CustomerShop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const imageUrl = (image) => {
        if (!image) return null;
        if (image.startsWith("http")) return image;
        return `${import.meta.env.VITE_API_URL}/uploads/products/${image}`;
    };

    if (loading) {
        return <div className="text-center py-5"><div className="spinner-border" /></div>;
    }

    return (
        <div>
            <h3 className="mb-4">Shop Products</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            {!error && products.length === 0 && (
                <div className="alert alert-info">No products available.</div>
            )}

            <div className="row g-4">
                {products.map((product) => {
                    const image = product.images?.[0]?.image || product.image;

                    return (
                        <div className="col-md-6 col-lg-4" key={product.productId}>
                            <div className="card h-100 border-0 shadow-sm">
                                {image ? (
                                    <img
                                        src={imageUrl(image)}
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
                                    <h6 className="mb-2">₹{Number(product.price || 0).toFixed(2)}</h6>
                                    <p className="text-muted mb-0">
                                        {Number(product.quantity) > 0
                                            ? `${product.quantity} available`
                                            : "Out of stock"}
                                    </p>
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
