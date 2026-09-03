const express = require("express");

const router = express.Router();

const customrtAddressController = require("../../controllers/customerAddressController");

const {
    authenticate,
    isCustomer
} = require("../../middleware/authMiddleware");

router.post("/api/create/address", authenticate, isCustomer, customrtAddressController.createAddress);

router.get("/api/addresses", authenticate, isCustomer, customrtAddressController.getAllAddressesOfCustomer);

router.get("/api/address/:addressId", authenticate, isCustomer, customrtAddressController.getMyAddressById);

router.put("/api/address/:addressId", authenticate, isCustomer, customrtAddressController.updateMyAddress);

router.delete("/api/address/:addressId", authenticate, isCustomer, customrtAddressController.deleteMyAddress);

module.exports = router;
