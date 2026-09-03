const productModel = require("../models/productModel");


// CREATE PRODUCT
const createProduct = async (req, res) => {

    try {

        const {
            productName,
            description,
            categoryId,
            sku,
            price,
            quantity,
            image,
            sortOrder,
            status,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        if (!productName) {
            return res.status(400).json({
                success: false,
                message: "Product name is required"
            });
        }

        if (!categoryId) {
            return res.status(400).json({
                success: false,
                message: "Category is required"
            });
        }

        if (!sku) {
            return res.status(400).json({
                success: false,
                message: "SKU is required"
            });
        }

        if (price === undefined || price === null) {
            return res.status(400).json({
                success: false,
                message: "Price is required"
            });
        }

        const result = await productModel.createOneProduct({
            productName,
            description,
            categoryId,
            sku,
            price,
            quantity,
            image,
            sortOrder,
            status,
            metaTitle,
            metaDescription,
            metaKeywords,
            createdBy: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            productId: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};


// GET ALL PRODUCTS
const getProducts = async (req, res) => {

    try {

        const products = await productModel.getAllProducts();

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};


// GET PRODUCT BY ID
const getProductById = async (req, res) => {

    try {

        const product = await productModel.getProductById(req.params.productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

    try {

        const {
            productName,
            description,
            categoryId,
            sku,
            price,
            quantity,
            image,
            sortOrder,
            status,
            metaTitle,
            metaDescription,
            metaKeywords
        } = req.body;

        const result = await productModel.updateProductById(
            req.params.productId,
            {
                productName,
                description,
                categoryId,
                sku,
                price,
                quantity,
                image,
                sortOrder,
                status,
                metaTitle,
                metaDescription,
                metaKeywords,
                updatedBy: req.user.userId
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

    try {

        const result = await productModel.deleteProductById(
            req.params.productId,
            req.user.userId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
