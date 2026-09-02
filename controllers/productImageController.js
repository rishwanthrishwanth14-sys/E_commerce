const {
    createOneProductImage,
    createManyProductImages,
    getImagesByProductId,
    getImageById,
    updateProductImageById,
    deleteImageById,
    deleteImagesByProductId
} = require("../models/productImage.model");


// ADD SINGLE IMAGE TO A PRODUCT
const addProductImage = async (req, res) => {
    try {
        const { productId } = req.params    ;

        const result = await createOneProductImage({
            productId,
            image: req.file ? req.file.filename : req.body.image,
            sortOrder: req.body.sortOrder,
            status: req.body.status,
            createdBy: req.user?.id || null
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


// ADD MULTIPLE IMAGES TO A PRODUCT (gallery upload)
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

        const images = files.map((file, index) => ({
            image: file.filename,
            sortOrder: index
        }));

        await createManyProductImages(
            productId,
            images,
            req.user?.id || null
        );

        return res.status(201).json({
            success: true,
            message: "Images added successfully"
        });

    } catch (error) {
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


// UPDATE IMAGE (sort order / status)
const updateProductImage = async (req, res) => {
    try {
        const { imageId } = req.params;

        const result = await updateProductImageById(imageId, {
            sortOrder: req.body.sortOrder,
            status: req.body.status,
            updatedBy: req.user?.id || null
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
            req.user?.id || null
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Image not found or already deleted"
            });
        }

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

        await deleteImagesByProductId(
            productId,
            req.user?.id || null
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