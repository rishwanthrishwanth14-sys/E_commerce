const express = require("express");

const router = express.Router();

const orderController = require("../../controllers/orderController");
const {
    authenticate,
    isAdmin,
    isCustomer
} = require("../../middleware/authMiddleware");

// a logged-in customer places an order for themselves
router.post("/api/place/order", authenticate, isCustomer, orderController.placeOrder);

// admin: every order in the system
router.get("/api/orders", authenticate, isAdmin, orderController.listAllOrders);

// a customer viewing their own history, or an admin looking up a customer's history
router.get(
    "/api/orders/customer/:customerId",
    authenticate,
    orderController.listOrdersByCustomer
);

module.exports = router;
