const express = require("express");

const router = express.Router();

const orderController = require("../../controllers/orderController");
const {
    authenticate,
    isAdmin
} = require("../../middleware/authMiddleware");

router.get(
    "/api/admin/orders",
    authenticate,
    isAdmin,
    orderController.listAllOrders
);

router.put(
    "/api/admin/order/:orderId/status",
    authenticate,
    isAdmin,
    orderController.updateOrderStatus
);

router.get(
    "/api/admin/orders/customer/:customerId",
    authenticate,
    isAdmin,
    orderController.listOrdersByCustomer
);

module.exports = router;
