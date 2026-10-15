import api from "./api";

// Create review
export const createReview = async (reviewData) => {
    const response = await api.post(
        "/api/customer/reviews",
        reviewData
    );

    return response.data;
};

// Get reviews for a product
export const getProductReviews = async (productId) => {
    const response = await api.get(
        `/api/customer/reviews/product/${productId}`
    );

    return response.data;
};

// Update review
export const updateReview = async (reviewId, reviewData) => {
    const response = await api.put(
        `/api/customer/reviews/${reviewId}`,
        reviewData
    );

    return response.data;
};

// Delete review
export const deleteReview = async (reviewId) => {
    const response = await api.delete(
        `/api/customer/reviews/${reviewId}`
    );

    return response.data;
};