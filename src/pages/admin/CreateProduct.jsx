import { useState } from "react";
import { createProduct } from "../../../services/productService";
import { uploadProductImages } from "../../../services/productImageService";

const CreateProduct = () => {

    const [formData, setFormData] = useState({
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
    });

    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {

        const selectedFiles = Array.from(e.target.files);

        setImages(selectedFiles);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setMessage("");

        try {

            // STEP 1: Create product
            const productResponse = await createProduct(formData);

            const productId = productResponse.productId;

            // STEP 2: Upload images
            if (images.length > 0) {

                await uploadProductImages(
                    productId,
                    images
                );
            }

            setMessage("Product created successfully");

            // Reset
            setFormData({
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
            });

            setImages([]);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to create product"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">

            <h3 className="mb-4">
                Create Product
            </h3>

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

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label">
                        Product Name
                    </label>

                    <input
                        type="text"
                        name="productName"
                        className="form-control"
                        value={formData.productName}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">
                        Description
                    </label>

                    <textarea
                        name="description"
                        className="form-control"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Category ID
                        </label>

                        <input
                            type="number"
                            name="categoryId"
                            className="form-control"
                            value={formData.categoryId}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            SKU
                        </label>

                        <input
                            type="text"
                            name="sku"
                            className="form-control"
                            value={formData.sku}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="row">

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="col-md-6 mb-3">

                        <label className="form-label">
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={formData.quantity}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="mb-3">

                    <label className="form-label">
                        Product Images
                    </label>

                    <input
                        type="file"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                </div>

                {images.length > 0 && (

                    <div className="mb-3">

                        <p>
                            Selected Images: {images.length}
                        </p>

                        <div className="d-flex gap-2 flex-wrap">

                            {images.map((image, index) => (

                                <div key={index}>

                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        width="100"
                                        height="100"
                                        style={{
                                            objectFit: "cover"
                                        }}
                                    />

                                </div>

                            ))}

                        </div>

                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Creating..."
                        : "Create Product"
                    }
                </button>

            </form>

        </div>
    );
};

export default CreateProduct;