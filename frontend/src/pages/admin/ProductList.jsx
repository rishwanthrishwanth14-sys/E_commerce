import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getProducts,
    deleteProduct,
    addStock
} from "../../service/productService";

import { getProductImageUrl } from "../../service/imageUrl";

const ProductList = () => {

    const navigate = useNavigate();

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

    const handleDelete = async (productId) => {

        const confirmed = window.confirm(
            "Are you sure you want to remove this product?"
        );

        if (!confirmed) return;

        try {

            await deleteProduct(productId);

            setProducts((prev) =>
                prev.filter(
                    (product) => product.productId !== productId
                )
            );

            alert("Product removed successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };

    const handleAddStock = async (productId) => {

        const quantity = window.prompt(
            "Enter stock quantity:"
        );

        if (quantity === null) return;

        const stock = Number(quantity);

        if (!Number.isInteger(stock) || stock <= 0) {

            alert("Enter a valid stock quantity");

            return;
        }

        try {

            await addStock(productId, stock);

            setProducts((prev) =>
                prev.map((product) =>
                    product.productId === productId
                        ? {
                            ...product,
                            quantity: product.quantity + stock
                        }
                        : product
                )
            );

            alert("Stock added successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add stock"
            );
        }
    };

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

                            {/* Product Image */}

                            <div
                                onClick={() =>
                                    navigate(
                                        `/admin/products/${product.productId}`
                                    )
                                }
                                style={{ cursor: "pointer" }}
                            >

                                {product.images?.length > 0 ? (

                                    <img
                                        src={getProductImageUrl(
                                            product.images[0].image
                                        )}
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

                            </div>

                            <div className="card-body">

                                {/* Product Name */}

                                <h5
                                    className="card-title"
                                    onClick={() =>
                                        navigate(
                                            `/admin/products/${product.productId}`
                                        )
                                    }
                                    style={{ cursor: "pointer" }}
                                >
                                    {product.productName}
                                </h5>

                                {/* Price */}

                                <p className="card-text">
                                   ₹ {Number(product.price).toLocaleString("en-IN")}
                                </p>

                                {/* SKU */}

                                <p className="text-muted mb-1">
                                    SKU: {product.sku}
                                </p>

                                {/* Stock */}

                                <p className="text-muted">
                                    Stock: {product.quantity}
                                </p>

                                {/* Buttons */}

                                <div className="d-flex gap-2 mt-3">

                                    <button
                                        type="button"
                                        className="btn btn-success btn-sm"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleAddStock(
                                                product.productId
                                            );
                                        }}
                                    >
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Add Stock
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleDelete(
                                                product.productId
                                            );
                                        }}
                                    >
                                        <i className="bi bi-trash me-1"></i>
                                        Remove Product
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default ProductList;