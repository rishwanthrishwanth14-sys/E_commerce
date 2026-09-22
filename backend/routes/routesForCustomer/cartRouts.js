const express = require("express");

const router = express.Router();

const cartController = require("../../controllers/cartController");
const {
    authenticate,
    isCustomer
} = require("../../middleware/authMiddleware");

router.get(
    "/api/cart",
    authenticate,
    isCustomer,
    cartController.getCart
);

router.post(
    "/api/cart/items",
    authenticate,
    isCustomer,
    cartController.addToCart
);

router.put(
    "/api/cart/items/:cartItemId",
    authenticate,
    isCustomer,
    cartController.updateCartItem
);

router.delete(
    "/api/cart/items/:cartItemId",
    authenticate,
    isCustomer,
    cartController.removeCartItem
);

router.delete(
    "/api/cart",
    authenticate,
    isCustomer,
    cartController.clearCart
);

module.exports = router;
