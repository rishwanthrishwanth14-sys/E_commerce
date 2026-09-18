const express = require("express");

const router = express.Router();

const productImageController =
    require("../../controllers/productImageController");

const {
    authenticate,
    isAdmin
} = require("../../middleware/authMiddleware");

const upload = require("../../middleware/uploadMiddleware");


// SINGLE IMAGE
router.post(
    "/api/admin/product/:productId/image",
    authenticate,
    isAdmin,
    upload.single("image"),
    productImageController.addProductImage
);


// MULTIPLE IMAGES
router.post(
    "/api/admin/product/:productId/images",
    authenticate,
    isAdmin,
    upload.array("images", 10),
    productImageController.addProductImages
);


// GET ALL PRODUCT IMAGES
router.get(
    "/api/admin/product/:productId/images",
    authenticate,
    isAdmin,
    productImageController.getProductImages
);


// GET SINGLE IMAGE
router.get(
    "/api/admin/product-image/:imageId",
    authenticate,
    isAdmin,
    productImageController.getSingleImage
);


// UPDATE IMAGE
router.put(
    "/api/admin/product-image/:imageId",
    authenticate,
    isAdmin,
    productImageController.updateProductImage
);


// DELETE SINGLE IMAGE
router.delete(
    "/api/admin/product-image/:imageId",
    authenticate,
    isAdmin,
    productImageController.deleteProductImage
);


// DELETE ALL PRODUCT IMAGES
router.delete(
    "/api/admin/product/:productId/images",
    authenticate,
    isAdmin,
    productImageController.deleteAllProductImages
);


module.exports = router;