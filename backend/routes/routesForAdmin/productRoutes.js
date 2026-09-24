const express = require("express");

const router = express.Router();

const productController = require("../../controllers/productController");


const {
    authenticate,
    isAdmin
} = require("../../middleware/authMiddleware");


router.post("/api/admin/product", authenticate, isAdmin, productController.createProduct);

router.get("/api/admin/products", authenticate, isAdmin, productController.getProducts);

router.get("/api/admin/product/:productId", authenticate, isAdmin, productController.getProductById);

router.put("/api/admin/product/:productId", authenticate, isAdmin, productController.updateProduct);

router.delete("/api/admin/product/:productId", authenticate, isAdmin, productController.deleteProduct);

router.patch("/api/admin/product/:productId/stock",authenticate,isAdmin,productController.addStock);


module.exports = router;