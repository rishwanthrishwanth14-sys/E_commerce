
const aiModel = require("../models/aiModel");
const aiService = require("../services/aiService");

const getProductReviewSummary = async (req, res) => {
    try {
        const productId = Number(req.params.productId);

        // Validate product ID
        if (!Number.isInteger(productId) || productId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID"
            });
        }

        // Step 1: Fetch real reviews from MySQL
        const reviews = await aiModel.getReviewsForAI(productId);

        if (reviews.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reviews found for this product"
            });
        }

        // Step 2: Send reviews to Ollama AI
        const summary = await aiService.generateReviewSummary(reviews);

        // Step 3: Return the AI result
        return res.status(200).json({
            success: true,
            productId,
            reviewCount: reviews.length,
            summary
        });

    } catch (error) {
        console.error("AI review summary error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Failed to generate review summary"
        });
    }
};

module.exports = {
    getProductReviewSummary
};
