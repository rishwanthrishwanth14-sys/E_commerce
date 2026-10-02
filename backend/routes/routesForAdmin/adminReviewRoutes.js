const express = require("express");

const router = express.Router();

const reviewController = require("../../controllers/productReviewController");

const {authenticate,isAdmin} = require("../../middleware/authMiddleware");



// Get all reviews
router.get(
    "/api/admin/reviews",
    authenticate,
    isAdmin,
    reviewController.getAllReviews
);


// Update review status
router.put(
    "/api/admin/reviews/:reviewId/status",
    authenticate,
    isAdmin,
    reviewController.updateReviewStatus
);


// Delete review
router.delete(
    "/api/admin/reviews/:reviewId",
    authenticate,
    isAdmin,
    reviewController.adminDeleteReview
);


module.exports = router;