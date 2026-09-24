import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";

const EditProduct = () => {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        categoryId: "",
        sku: "",
        price: "",
        quantity: "",
        sortOrder: "",
        status: 1,
        metaTitle: "",
        metaDescription: "",
        metaKeywords: "",
        seoUrl: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProduct = async () => {

            try {

                const response = await api.get(
                    `/api/admin/product/${productId}`
                );

                const product = response.data.data;

                setFormData({
                    productName: product.productName || "",
                    description: product.description || "",
                    categoryId: product.categoryId || "",
                    sku: product.sku || "",
                    price: product.price || "",
                    quantity: product.quantity || "",
                    sortOrder: product.sortOrder || 0,
                    status: product.status ?? 1,
                    metaTitle: product.metaTitle || "",
                    metaDescription:
                        product.metaDescription || "",
                    metaKeywords:
                        product.metaKeywords || "",
                    seoUrl: product.seoUrl || ""
                });

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

        loadProduct();

    }, [productId]);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            await api.put(
                `/api/admin/product/${productId}`,
                {
                    ...formData,
                    categoryId: Number(formData.categoryId),
                    price: Number(formData.price),
                    quantity: Number(formData.quantity),
                    sortOrder: Number(formData.sortOrder),
                    status: Number(formData.status)
                }
            );

            alert("Product updated successfully");

            navigate(
                `/admin/products/${productId}`
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );

        } finally {

            setSaving(false);

        }
    };


    if (loading) {
        return (
            <div className="text-center py-5">
                Loading product...
            </div>
        );
    }


    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between mb-4">

                <h2>Edit Product</h2>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate(
                            `/admin/products/${productId}`
                        )
                    }
                >
                    Back
                </button>

            </div>


            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            <form onSubmit={handleSubmit}>

                <div className="card border-0 shadow-sm">

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-6">

                                <label className="form-label">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="productName"
                                    className="form-control"
                                    value={
                                        formData.productName
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    SKU
                                </label>

                                <input
                                    type="text"
                                    name="sku"
                                    className="form-control"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-12">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={
                                        formData.description
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Category ID
                                </label>

                                <input
                                    type="number"
                                    name="categoryId"
                                    className="form-control"
                                    value={
                                        formData.categoryId
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Stock
                                </label>

                                <input
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    value={
                                        formData.quantity
                                    }
                                    onChange={handleChange}
                                    min="0"
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Sort Order
                                </label>

                                <input
                                    type="number"
                                    name="sortOrder"
                                    className="form-control"
                                    value={
                                        formData.sortOrder
                                    }
                                    onChange={handleChange}
                                    min="0"
                                />

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value={1}>
                                        Active
                                    </option>

                                    <option value={0}>
                                        Inactive
                                    </option>
                                </select>

                            </div>


                            <div className="col-md-4">

                                <label className="form-label">
                                    SEO URL
                                </label>

                                <input
                                    type="text"
                                    name="seoUrl"
                                    className="form-control"
                                    value={formData.seoUrl}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Meta Title
                                </label>

                                <input
                                    type="text"
                                    name="metaTitle"
                                    className="form-control"
                                    value={
                                        formData.metaTitle
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-md-6">

                                <label className="form-label">
                                    Meta Keywords
                                </label>

                                <input
                                    type="text"
                                    name="metaKeywords"
                                    className="form-control"
                                    value={
                                        formData.metaKeywords
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="col-12">

                                <label className="form-label">
                                    Meta Description
                                </label>

                                <textarea
                                    name="metaDescription"
                                    className="form-control"
                                    rows="3"
                                    value={
                                        formData.metaDescription
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate(
                                        `/admin/products/${productId}`
                                    )
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                </div>

            </form>

        </div>
    );
};

export default EditProduct;