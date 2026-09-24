import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../service/api";
import { getProductImageUrl } from "../../service/imageUrl";

const ProductImages = () => {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");


    const loadImages = async () => {

        try {

            const response = await api.get(
                `/api/admin/product/${productId}/images`
            );

            setImages(response.data.data || []);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load product images"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadImages();

    }, [productId]);


    const handleFileChange = (e) => {

        setSelectedFiles(
            Array.from(e.target.files)
        );

    };


    const handleUpload = async () => {

        if (!selectedFiles.length) {

            alert("Please select image files");

            return;
        }

        try {

            setUploading(true);

            const formData = new FormData();

            selectedFiles.forEach((file) => {

                formData.append(
                    "images",
                    file
                );

            });

            await api.post(
                `/api/admin/product/${productId}/images`,
                formData
            );

            alert("Images uploaded successfully");

            setSelectedFiles([]);

            await loadImages();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to upload images"
            );

        } finally {

            setUploading(false);

        }
    };


    const handleDelete = async (imageId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this image?"
        );

        if (!confirmed) return;

        try {

            await api.delete(
                `/api/admin/product-image/${imageId}`
            );

            setImages((prev) =>
                prev.filter(
                    (image) =>
                        image.imageId !== imageId
                )
            );

            alert("Image deleted successfully");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to delete image"
            );

        }
    };


    if (loading) {

        return (
            <div className="text-center py-5">
                Loading images...
            </div>
        );
    }


    return (

        <div className="container-fluid py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <button
                        className="btn btn-outline-secondary btn-sm mb-2"
                        onClick={() =>
                            navigate(
                                `/admin/products/${productId}`
                            )
                        }
                    >
                        <i className="bi bi-arrow-left me-1"></i>
                        Back to Product
                    </button>

                    <h2 className="mb-0">
                        Product Images
                    </h2>

                </div>

            </div>


            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}


            {/* Upload */}

            <div className="card border-0 shadow-sm mb-4">

                <div className="card-body">

                    <h5 className="mb-3">
                        Upload Images
                    </h5>

                    <div className="row align-items-end">

                        <div className="col-md-8">

                            <label className="form-label">
                                Select Images
                            </label>

                            <input
                                type="file"
                                className="form-control"
                                accept="image/jpeg,image/jpg,image/png,image/webp"
                                multiple
                                onChange={handleFileChange}
                            />

                        </div>

                        <div className="col-md-4">

                            <button
                                type="button"
                                className="btn btn-primary w-100"
                                disabled={
                                    uploading ||
                                    !selectedFiles.length
                                }
                                onClick={handleUpload}
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Upload Images"}
                            </button>

                        </div>

                    </div>


                    {selectedFiles.length > 0 && (

                        <div className="mt-3">

                            <small className="text-muted">
                                {selectedFiles.length} image(s)
                                selected
                            </small>

                        </div>

                    )}

                </div>

            </div>


            {/* Existing Images */}

            <div className="card border-0 shadow-sm">

                <div className="card-body">

                    <h5 className="mb-4">
                        Existing Images
                    </h5>


                    {images.length === 0 ? (

                        <div className="text-center text-muted py-5">
                            No images available
                        </div>

                    ) : (

                        <div className="row g-4">

                            {images.map((image) => (

                                <div
                                    className="col-md-4 col-lg-3"
                                    key={image.imageId}
                                >

                                    <div className="card h-100">

                                        <div
                                            className="d-flex align-items-center justify-content-center bg-light"
                                            style={{
                                                height: "250px"
                                            }}
                                        >

                                            <img
                                                src={getProductImageUrl(
                                                    image.image
                                                )}
                                                alt="Product"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }}
                                            />

                                        </div>


                                        <div className="card-body">

                                            <p className="small text-muted mb-2">
                                                Image ID:{" "}
                                                {
                                                    image.imageId
                                                }
                                            </p>

                                            <p className="small text-muted text-truncate">
                                                {image.image}
                                            </p>

                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm w-100"
                                                onClick={() =>
                                                    handleDelete(
                                                        image.imageId
                                                    )
                                                }
                                            >
                                                <i className="bi bi-trash me-1"></i>
                                                Delete Image
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default ProductImages;