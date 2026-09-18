const express = require("express");

const router = express.Router();

const customerController = require("../../controllers/customerController");

const {
    authenticate,
    isCustomer
} = require("../../middleware/authMiddleware")

//public

router.post("/api/customer/register", customerController.registerCustomer);

router.post("/api/customer/login", customerController.loginCustomer);



//only acess by cutomer

router.get("/api/customer/profile", authenticate, isCustomer, customerController.getMyProfile);

router.put("/api/customer/profile", authenticate, isCustomer, customerController.updateMyProfile);

router.delete("/api/customer/profile", authenticate, isCustomer, customerController.deleteMyAccount);

module.exports = router;
