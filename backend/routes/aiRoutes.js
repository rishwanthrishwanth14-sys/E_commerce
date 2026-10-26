
const express = require("express");
const router = express.Router();


const {
    getProductReviewSummary
} = require("../controllers/aiController");

// Generate an AI summary for a product's customer reviews
router.get(
    "/products/:productId/review-summary",
    getProductReviewSummary
);

module.exports = router;
