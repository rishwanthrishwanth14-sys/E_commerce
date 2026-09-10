import { useEffect, useState } from "react";
import { getProducts } from "../../../services/productService";

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await getProducts();

                setProducts(response.data);

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch products"
                );

            } finally {

                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    return (

        <div className="container mt-4">

            <h3 className="mb-4">
                Products
            </h3>

            <div className="row">

                {products.map((product) => (

                    <div
                        className="col-md-3 mb-4"
                        key={product.productId}
                    >

                        <div className="card h-100">

                            {product.images?.length > 0 ? (

                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.images[0].image}`}
                                    className="card-img-top"
                                    alt={product.productName}
                                    style={{
                                        height: "220px",
                                        objectFit: "cover"
                                    }}
                                />

                            ) : (

                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        height: "220px",
                                        background: "#f5f5f5"
                                    }}
                                >
                                    No Image
                                </div>

                            )}

                            <div className="card-body">

                                <h5 className="card-title">
                                    {product.productName}
                                </h5>

                                <p className="card-text">
                                    ₹{product.price}
                                </p>

                                <p className="text-muted">
                                    SKU: {product.sku}
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ProductList;