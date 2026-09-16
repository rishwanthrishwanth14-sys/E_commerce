const categoryModel = require("../models/categoryModel");


// CREATE CATEGORY
const createCategory = async (req, res) => {

    try {

        const {
            categoryName,
            description,
            metaTitle,
            metaDescription,
            metaKeywords,
            parent,
            image,
            sortOrder,
            status
        } = req.body;

        if (!categoryName) {
            return res.status(400).json({
                success: false,
                message: "Category name is required"
            });
        }

        if (!metaTitle) {
            return res.status(400).json({
                success: false,
                message: "Meta title is required"
            });
        }

        const result = await categoryModel.createOneCategory({
            categoryName,
            description,
            metaTitle,
            metaDescription,
            metaKeywords,
            parent,
            image,
            sortOrder,
            status,
            createdBy: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            categoryId: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create category",
            error: error.message
        });
    }
};


// GET ALL CATEGORIES
const getCategories = async (req, res) => {

    try {

        const categories = await categoryModel.getAllCategories();

        res.status(200).json({
            success: true,
            data: categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch categories",
            error: error.message
        });
    }
};


// GET CATEGORY BY ID
const getCategoryById = async (req, res) => {

    try {

        const category = await categoryModel.getCategoryById(req.params.categoryId);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// UPDATE CATEGORY
const updateCategory = async (req, res) => {

    try {

        const {
            categoryName,
            description,
            metaTitle,
            metaDescription,
            metaKeywords,
            parent,
            image,
            sortOrder,
            status
        } = req.body;

        const result = await categoryModel.updateCategoryById(
            req.params.categoryId,
            {
                categoryName,
                description,
                metaTitle,
                metaDescription,
                metaKeywords,
                parent,
                image,
                sortOrder,
                status,
                updatedBy: req.user.userId
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


// DELETE CATEGORY
const deleteCategory = async (req, res) => {

    try {

        const result = await categoryModel.deleteCategoryById(
            req.params.categoryId,
            req.user.userId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete category",
            error: error.message
        });
    }
};


module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};
