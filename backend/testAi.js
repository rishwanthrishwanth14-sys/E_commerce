require("dotenv").config();

const aiModel = require("./models/aiModel");
const aiService = require("./services/aiService");

const testAI = async () => {
    try {
        // Step 1: Fetch actual reviews from MySQL
        const reviews = await aiModel.getReviewsForAI(6);

        console.log("Reviews from MySQL:");
        console.log(reviews);

        if (reviews.length === 0) {
            console.log("No reviews found for this product.");
            return;
        }

        // Step 2: Send reviews to Ollama
        const summary = await aiService.generateReviewSummary(reviews);

        console.log("\nAI-generated summary:");
        console.log(summary);
    } catch (error) {
        console.error("AI test failed:", error.message);
    }
};

testAI();