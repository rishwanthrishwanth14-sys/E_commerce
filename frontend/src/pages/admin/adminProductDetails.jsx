import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../service/api";
import { getProductImageUrl } from "../../service/imageUrl";
import { addStock, deleteProduct } from "../../service/productService";

const AdminProductDetails = () => {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const getProduct = async () => {

            try {

                const response = await api.get(
                    `/api/admin/product/${productId}`
                );

                const productData = response.data.data;

                setProduct(productData);

                if (productData.images?.length > 0) {
                    setSelectedImage(
                        productData.images[0].image
                    );
                }

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }
        };

        getProduct();

    }, [productId]);


    const handleAddStock = async () => {

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

            const response = await addStock(
                product.productId,
                stock
            );

            setProduct((prev) => ({
                ...prev,
                quantity: response.data.quantity
            }));

            alert("Stock added successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to add stock"
            );
        }
    };


    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to remove this product?"
        );

        if (!confirmed) return;

        try {

            await deleteProduct(product.productId);

            alert("Product removed successfully");

            navigate("/admin/products");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };


    if (loading) {

        return (
            <div className="text-center py-5">
                <div className="spinner-border" />
                <p className="mt-2">
                    Loading product...
                </p>
            </div>
        );
    }


    if (error) {

        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }


    if (!product) {

        return (
            <div className="alert alert-warning">
                Product not found
            </div>
        );
    }


    return (

        <div className="container-fluid py-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mb-2"
                        onClick={() =>
                            navigate("/admin/products")
                        }
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Products
                    </button>

                    <h2 className="mb-0">
                        Product Details
                    </h2>

                </div>

                <div className="d-flex gap-2">

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            navigate(
                                `/admin/product/edit/${product.productId}`
                            )
                        }
                    >
                        <i className="bi bi-pencil me-1"></i>
                        Edit Product
                    </button>

                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        <i className="bi bi-trash me-1"></i>
                        Remove Product
                    </button>

                </div>

            </div>


            {/* Main Product */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <div className="row g-5">


                        {/* IMAGE SECTION */}

                        <div className="col-lg-6">

                            <div
                                className="border rounded d-flex align-items-center justify-content-center bg-light"
                                style={{
                                    height: "520px",
                                    overflow: "hidden"
                                }}
                            >

                                {selectedImage ? (

                                    <img
                                        src={getProductImageUrl(
                                            selectedImage
                                        )}
                                        alt={
                                            product.productName
                                        }
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "contain"
                                        }}
                                    />

                                ) : (

                                    <div className="text-muted fs-5">
                                        No Image Available
                                    </div>

                                )}

                            </div>


                            {/* IMAGE GALLERY */}

                            {product.images?.length > 0 && (

                                <div className="d-flex gap-3 mt-3 flex-wrap">

                                    {product.images.map(
                                        (image) => (

                                            <div
                                                key={
                                                    image.imageId
                                                }
                                                onClick={() =>
                                                    setSelectedImage(
                                                        image.image
                                                    )
                                                }
                                                className="border rounded p-1"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    cursor: "pointer"
                                                }}
                                            >

                                                <img
                                                    src={getProductImageUrl(
                                                        image.image
                                                    )}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover"
                                                    }}
                                                />

                                            </div>

                                        )
                                    )}

                                </div>

                            )}

                            <button
                                type="button"
                                className="btn btn-outline-primary mt-3"
                                onClick={() =>
                                    navigate(
                                        `/admin/products/${product.productId}/images`
                                    )
                                }
                            >
                                <i className="bi bi-images me-1"></i>
                                Manage Images
                            </button>

                        </div>


                        {/* PRODUCT BASIC DETAILS */}

                        <div className="col-lg-6">

                            <h1 className="mb-3">
                                {product.productName}
                            </h1>


                            <div className="mb-3">

                                {product.status === 1 ? (

                                    <span className="badge bg-success">
                                        Active
                                    </span>

                                ) : (

                                    <span className="badge bg-secondary">
                                        Inactive
                                    </span>

                                )}

                            </div>


                            <h3 className="text-primary mb-4">
                                ₹{product.price}
                            </h3>


                            <div className="border-top pt-3">

                                <div className="row mb-3">

                                    <div className="col-sm-4 text-muted">
                                        Product ID
                                    </div>

                                    <div className="col-sm-8 fw-semibold">
                                        {product.productId}
                                    </div>

                                </div>


                                <div className="row mb-3">

                                    <div className="col-sm-4 text-muted">
                                        SKU
                                    </div>

                                    <div className="col-sm-8 fw-semibold">
                                        {product.sku}
                                    </div>

                                </div>


                                <div className="row mb-3">

                                    <div className="col-sm-4 text-muted">
                                        Category
                                    </div>

                                    <div className="col-sm-8">
                                        {product.categoryName ||
                                            product.categoryId ||
                                            "N/A"}
                                    </div>

                                </div>


                                <div className="row mb-3">

                                    <div className="col-sm-4 text-muted">
                                        Stock
                                    </div>

                                    <div className="col-sm-8">

                                        <span className="fw-semibold me-3">
                                            {product.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            className="btn btn-success btn-sm"
                                            onClick={
                                                handleAddStock
                                            }
                                        >
                                            <i className="bi bi-plus-circle me-1"></i>
                                            Add Stock
                                        </button>

                                    </div>

                                </div>


                                <div className="row mb-3">

                                    <div className="col-sm-4 text-muted">
                                        Sort Order
                                    </div>

                                    <div className="col-sm-8">
                                        {product.sortOrder}
                                    </div>

                                </div>

                            </div>


                            <div className="mt-4">

                                <h5>
                                    Description
                                </h5>

                                <p className="text-muted">
                                    {product.description ||
                                        "No description available."}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* SEO DETAILS */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body p-4">

                    <h4 className="mb-4">
                        SEO Information
                    </h4>


                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <label className="form-label text-muted">
                                Meta Title
                            </label>

                            <div className="border rounded p-3">
                                {product.metaTitle ||
                                    "N/A"}
                            </div>

                        </div>


                        <div className="col-md-6 mb-4">

                            <label className="form-label text-muted">
                                SEO URL
                            </label>

                            <div className="border rounded p-3">
                                {product.seoUrl ||
                                    "N/A"}
                            </div>

                        </div>


                        <div className="col-md-6 mb-4">

                            <label className="form-label text-muted">
                                Meta Description
                            </label>

                            <div className="border rounded p-3">
                                {product.metaDescription ||
                                    "N/A"}
                            </div>

                        </div>


                        <div className="col-md-6 mb-4">

                            <label className="form-label text-muted">
                                Meta Keywords
                            </label>

                            <div className="border rounded p-3">
                                {product.metaKeywords ||
                                    "N/A"}
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* AUDIT DETAILS */}

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                    <h4 className="mb-4">
                        Product Information
                    </h4>

                    <div className="row">

                        <div className="col-md-6">

                            <p>
                                <strong>
                                    Created:
                                </strong>{" "}
                                {product.createdAt
                                    ? new Date(
                                        product.createdAt
                                    ).toLocaleString()
                                    : "N/A"}
                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>
                                <strong>
                                    Last Updated:
                                </strong>{" "}
                                {product.updatedAt
                                    ? new Date(
                                        product.updatedAt
                                    ).toLocaleString()
                                    : "N/A"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminProductDetails;