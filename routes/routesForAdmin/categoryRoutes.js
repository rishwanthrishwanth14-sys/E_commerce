const express = require("express");

const router = express.Router();

const categoryController = require("../../controllers/categoryController");

const {
    authenticate,
    isAdmin
} = require("../../middleware/authMiddleware");


router.post("/api/admin/create/category", authenticate, isAdmin, categoryController.createCategory);

router.get("/api/admin/categories", authenticate, isAdmin, categoryController.getCategories);

router.get("/api/admin/category/:categoryId", authenticate, isAdmin, categoryController.getCategoryById);

router.put("/api/admin/category/:categoryId", authenticate, isAdmin, categoryController.updateCategory);

router.delete("/api/admin/category/:categoryId", authenticate, isAdmin, categoryController.deleteCategory);

module.exports = router;
