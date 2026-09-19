const express = require("express");
const router = express.Router();

const productController = require("../../controllers/productController");
const {authenticate, isCustomer} = require ("../../middleware/authMiddleware")

router.get("/api/customer/products",
    authenticate,
    isCustomer,
    productController.getProducts
);

router.get(
    "/api/customer/products/:productId",
    authenticate,
    isCustomer,
    productController.getProductById
);

module.exports = router;