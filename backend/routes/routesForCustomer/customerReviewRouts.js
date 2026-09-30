const express = require("express");

const router = express.Router();

const reviewController = require("../../controllers/productReviewController");

const authenticate = require("../../middleware/authMiddleware");
const isCustomer = require("../../middleware/authMiddleware");


// Create Review
router.post(
    "/api/customer/reviews",
    authenticate,
    isCustomer,
    reviewController.createReview
);


// Get all reviews for a product
router.get(
    "/api/customer/reviews/product/:productId",
    reviewController.getProductReviews
);


// Get one review
router.get(
    "/api/customer/reviews/:reviewId",
    authenticate,
    isCustomer,
    reviewController.getReviewById
);


// Update review
router.put(
    "/api/customer/reviews/:reviewId",
    authenticate,
    isCustomer,
    reviewController.updateReview
);


// Delete review
router.delete(
    "/api/customer/reviews/:reviewId",
    authenticate,
    isCustomer,
    reviewController.deleteReview
);


module.exports = router;