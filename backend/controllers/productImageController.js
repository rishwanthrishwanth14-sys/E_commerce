const fs = require("fs/promises");
const path = require("path");

const {
    createOneProductImage,
    createManyProductImages,
    getImagesByProductId,
    getImageById,
    updateProductImageById,
    deleteImageById,
    deleteImagesByProductId
} = require("../models/productImageModel");

const { getProductById } = require("../models/productModel");

const uploadDir = path.join(
    __dirname,
    "..",
    "uploads",
    "products"
);

const removeUploadedFile = async (filename) => {
    if (!filename) return;

    try {
        await fs.unlink(path.join(uploadDir, filename));
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error("Failed to remove uploaded file:", error.message);
        }
    }
};

// ADD SINGLE IMAGE TO A PRODUCT
const addProductImage = async (req, res) => {
    try {
        const { productId } = req.params;

        // Check whether image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        
        const product = await getProductById(productId);

        if (!product || Number(product.status) !== 1) {
            await removeUploadedFile(req.file.filename);

            return res.status(404).json({
                success: false,
                message: "Product not found or inactive"
            });
        }

        const result = await createOneProductImage({
            productId,

            // Store ONLY filename in database
            image: req.file.filename,

            sortOrder: req.body.sortOrder || 0,
            status: req.body.status ?? 1,

            // JWT middleware puts user id inside req.user.userId
            createdBy: req.user?.userId || null
        });

        return res.status(201).json({
            success: true,
            message: "Image added successfully",
            imageId: result.insertId
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to add image",
            error: error.message
        });
    }
};


// ADD MULTIPLE IMAGES TO A PRODUCT
const addProductImages = async (req, res) => {
    try {
        const { productId } = req.params;

        const files = req.files || [];

        if (files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No images provided"
            });
        }

        const product = await getProductById(productId);

        if (!product || Number(product.status) !== 1) {
            await Promise.all(
                files.map((file) => removeUploadedFile(file.filename))
            );

            return res.status(404).json({
                success: false,
                message: "Product not found or inactive"
            });
        }

        const images = files.map((file, index) => ({
            // Store ONLY filename
            image: file.filename,
            sortOrder: index
        }));

        await createManyProductImages(
            productId,
            images,
            req.user?.userId || null
        );

        return res.status(201).json({
            success: true,
            message: "Images added successfully"
        });

    } catch (error) {

        if (req.files?.length) {
            await Promise.all(
                req.files.map((file) => removeUploadedFile(file.filename))
            );
        }

        return res.status(500).json({
            success: false,
            message: "Failed to add images",
            error: error.message
        });
    }
};


// GET ALL IMAGES OF A PRODUCT
const getProductImages = async (req, res) => {
    try {
        const { productId } = req.params;

        const images = await getImagesByProductId(productId);

        return res.status(200).json({
            success: true,
            data: images
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch images",
            error: error.message
        });
    }
};


// GET SINGLE IMAGE
const getSingleImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const image = await getImageById(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: image
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch image",
            error: error.message
        });
    }
};


// UPDATE IMAGE
const updateProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const result = await updateProductImageById(imageId, {
            sortOrder: req.body.sortOrder,
            status: req.body.status,

            updatedBy: req.user?.userId || null
        });

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Image not found or already deleted"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Image updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update image",
            error: error.message
        });
    }
};


// DELETE SINGLE IMAGE
const deleteProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const result = await deleteImageById(
            imageId,
            req.user?.userId || null
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Image not found or already deleted"
            });
        }

        await removeUploadedFile(result.image);

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete image",
            error: error.message
        });
    }
};


// DELETE ALL IMAGES OF A PRODUCT
const deleteAllProductImages = async (req, res) => {
    try {
        const { productId } = req.params;
        const images = await getImagesByProductId(productId);

        await deleteImagesByProductId(
            productId,
            req.user?.userId || null
        );

            await Promise.all(
            images.map((image) => removeUploadedFile(image.image))
        );

        return res.status(200).json({
            success: true,
            message: "All images deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete images",
            error: error.message
        });
    }
};


module.exports = {
    addProductImage,
    addProductImages,
    getProductImages,
    getSingleImage,
    updateProductImage,
    deleteProductImage,
    deleteAllProductImages
};