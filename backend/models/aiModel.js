const reviewModel = require("./productReviewModel");

const getReviewsForAI = async (productId) => {
    const reviews = await reviewModel.getProductReviews(productId);

    return reviews.map((review) => ({
        rating: review.rating,
        reviewText: review.reviewText
    }));
};

module.exports = { getReviewsForAI };