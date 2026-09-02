const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/customerControlByAdmin");

const {
    authenticate,
    isAdmin
}=require("../../middleware/authMiddleware");

router.get("/api/admin/customers",authenticate,isAdmin,customerController.getCustomersForAdmin);

router.get("/api/admin/customer/:customerId",authenticate,isAdmin,customerController.getCustomerByIdForAdmin);

module.exports = router;