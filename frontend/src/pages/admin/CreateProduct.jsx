    import { useState,useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import { createProduct } from "../../service/productService";
    import  {uploadProductImages}  from "../../service/productImageService";
    import { getCategories } from "../../service/categorieService";

    const initialForm ={
            productName: "",
            description: "",
            categoryId: "",
            sku: "",
            price: "",
            quantity: "",
            sortOrder: 0,
            status: 1,
            metaTitle: "",
            metaDescription: "",
            metaKeywords: ""
        };

    const CreateProduct = () => {
        const navigate = useNavigate();
        const [formData, setFormData] = useState(initialForm);
        const [categories, setCategories] =useState([]);
        const [images, setImages] = useState([]);
        const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState("");
        const [error, setError] = useState("");
        const [loadingCategories, setLoadingCategories] =useState(true);

            useEffect(() => {
        const loadCategories = async () => {
            try {
                const result =
                    await getCategories();

                setCategories(
                    (result.data || []).filter(
                        (category) =>
                            Number(
                                category.status
                            ) === 1
                    )
                );
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load categories"
                );
            } finally {
                setLoadingCategories(
                    false
                );
            }
        };

        loadCategories();
    }, []);

        const handleChange = (e) => {

            const { name, value } = e.target;

            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        };

        const handleImageChange = (e) => {

          setImages(
            Array.from(e.target.files || [])
        );
        };

        const handleSubmit = async (e) => {

            e.preventDefault();

         if (!formData.productName.trim()) {
            setError("Product name is required");
            return;
        }
        if (!formData.categoryId) {
            setError("Category is required");
            return;
        }
        if (!formData.sku.trim()) {
            setError("SKU is required");
            return;
        }
        if (
            formData.price === "" ||
            Number(formData.price) < 0
        ) {
            setError("Valid price is required");
            return;
        }
        if (
            formData.quantity === "" ||
            Number(formData.quantity) < 0
        ) {
            setError("Valid quantity is required");
            return;
        }
        if (!formData.metaTitle.trim()) {
            setError("Meta title is required");
            return;
        }
        try {
            setLoading(true);
            setError("");
            setMessage("");

            const result =
                await createProduct({
                    ...formData,
                    categoryId:
                        Number(
                            formData.categoryId
                        ),
                    price:
                        Number(formData.price),
                    quantity:
                        Number(
                            formData.quantity
                        ),
                    sortOrder:
                        Number(
                            formData.sortOrder
                        ) || 0,
                    status:
                        Number(formData.status)
                });

            if (images.length > 0) {
                await uploadProductImages(
                    result.productId,
                    images
                );
            }

            setMessage(
                "Product created successfully"
            );

            setFormData(initialForm);
            setImages([]);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to create product"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h3 className="mb-1">
                        Create Product
                    </h3>
                    <p className="text-muted mb-0">
                        Add a product and upload its images.
                    </p>
                </div>

                <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        navigate("/admin/products")
                    }
                >
                    Back to Products
                </button>
            </div>

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

            <div className="card border-0 shadow-sm">
                <div className="card-body">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">
                                    Product Name
                                </label>
                                <input
                                    className="form-control"
                                    name="productName"
                                    value={
                                        formData.productName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    SKU
                                </label>
                                <input
                                    className="form-control"
                                    name="sku"
                                    value={
                                        formData.sku
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Category
                                </label>
                                <select
                                    className="form-select"
                                    name="categoryId"
                                    value={
                                        formData.categoryId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    disabled={
                                        loadingCategories
                                    }
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map(
                                        (
                                            category
                                        ) => (
                                            <option
                                                key={
                                                    category.categoryId
                                                }
                                                value={
                                                    category.categoryId
                                                }
                                            >
                                                {
                                                    category.categoryName
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    className="form-control"
                                    name="price"
                                    value={
                                        formData.price
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="quantity"
                                    value={
                                        formData.quantity
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">
                                    Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="4"
                                    name="description"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Meta Title
                                </label>
                                <input
                                    className="form-control"
                                    name="metaTitle"
                                    value={
                                        formData.metaTitle
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Meta Keywords
                                </label>
                                <input
                                    className="form-control"
                                    name="metaKeywords"
                                    value={
                                        formData.metaKeywords
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label">
                                    Meta Description
                                </label>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    name="metaDescription"
                                    value={
                                        formData.metaDescription
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Sort Order
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="sortOrder"
                                    value={
                                        formData.sortOrder
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Status
                                </label>
                                <select
                                    className="form-select"
                                    name="status"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value={1}>
                                        Active
                                    </option>
                                    <option value={0}>
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label className="form-label">
                                    Product Images
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
                                    multiple
                                    accept=".jpg,.jpeg,.png,.webp"
                                    onChange={
                                        handleImageChange
                                    }
                                />
                            </div>

                            {images.length > 0 && (
                                <div className="col-12">
                                    <p className="mb-2">
                                        Selected images:{" "}
                                        {
                                            images.length
                                        }
                                    </p>

                                    <div className="d-flex gap-2 flex-wrap">
                                        {images.map(
                                            (
                                                image
                                            ) => (
                                                <img
                                                    key={
                                                        image.name +
                                                        image.lastModified
                                                    }
                                                    src={URL.createObjectURL(
                                                        image
                                                    )}
                                                    alt={
                                                        image.name
                                                    }
                                                    width="100"
                                                    height="100"
                                                    style={{
                                                        objectFit:
                                                            "cover"
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Product"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;