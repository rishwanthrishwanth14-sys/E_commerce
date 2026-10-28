import api from "./api";

export const getProductReviewSummary = async (productId) =>{
    const response = await api.get(
        `/api/ai/products/${productId}/review-summary`
    );
    return response.data;
}