const reviewModel = require("../models/reviewModel");


// Create Review
const createReview = async (req, res) => {

    try {

        const {
            productId,
            rating,
            reviewText
        } = req.body;

        const customerId = req.user.customerId;


        // Validate productId
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }


        // Validate rating
        if (
            rating === undefined ||
            rating === null ||
            Number(rating) < 1 ||
            Number(rating) > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }


        // Validate review text
        if (
            !reviewText ||
            reviewText.trim().length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Review text is required"
            });
        }


        // Check whether customer purchased the product
        const isVerifiedPurchase =
            await reviewModel.checkVerifiedPurchase(
                customerId,
                productId
            );


        // Create review
        const reviewId =
            await reviewModel.createReview(
                productId,
                customerId,
                Number(rating),
                reviewText.trim(),
                isVerifiedPurchase
            );


        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            reviewId
        });

    } catch (error) {

        console.error(
            "Create review error:",
            error
        );


        // Duplicate review
        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                success: false,
                message: "You have already reviewed this product"
            });
        }


        return res.status(500).json({
            success: false,
            message: "Failed to create review"
        });
    }
};



// Get product reviews
const getProductReviews = async (req, res) => {

    try {

        const { productId } = req.params;


        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
            });
        }


        const reviews =
            await reviewModel.getProductReviews(
                productId
            );


        return res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {

        console.error(
            "Get product reviews error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to get product reviews"
        });
    }
};



// Get one review
const getReviewById = async (req, res) => {

    try {

        const { reviewId } = req.params;


        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required"
            });
        }


        const review =
            await reviewModel.getReviewById(
                reviewId
            );


        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }


        return res.status(200).json({
            success: true,
            review
        });

    } catch (error) {

        console.error(
            "Get review error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to get review"
        });
    }
};



// Update review
const updateReview = async (req, res) => {

    try {

        const { reviewId } = req.params;

        const {
            rating,
            reviewText
        } = req.body;

        const customerId = req.user.customerId;


        // Validate review ID
        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required"
            });
        }


        // Validate rating
        if (
            rating === undefined ||
            rating === null ||
            Number(rating) < 1 ||
            Number(rating) > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }


        // Validate review text
        if (
            !reviewText ||
            reviewText.trim().length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Review text is required"
            });
        }


        const affectedRows =
            await reviewModel.updateReview(
                reviewId,
                customerId,
                Number(rating),
                reviewText.trim()
            );


        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message:
                    "Review not found or you are not allowed to update this review"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Review updated successfully"
        });

    } catch (error) {

        console.error(
            "Update review error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to update review"
        });
    }
};



// Delete review
const deleteReview = async (req, res) => {

    try {

        const { reviewId } = req.params;

        const customerId = req.user.customerId;


        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required"
            });
        }


        const affectedRows =
            await reviewModel.deleteReview(
                reviewId,
                customerId
            );


        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message:
                    "Review not found or you are not allowed to delete this review"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {

        console.error(
            "Delete review error:",
            error
        );


        return res.status(500).json({
            success: false,
            message: "Failed to delete review"
        });
    }
};









// Get all reviews for admin
const getAllReviews = async (req, res) => {

    try {

        const reviews = await reviewModel.getAllReviews();

        return res.status(200).json({
            success: true,
            reviews
        });

    } catch (error) {

        console.error(
            "Get all reviews error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to get reviews"
        });
    }
};


// Update review status
const updateReviewStatus = async (req, res) => {

    try {

        const { reviewId } = req.params;
        const { status } = req.body;


        // Validate review ID
        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required"
            });
        }


        // Validate status
        if (
            status === undefined ||
            (Number(status) !== 0 &&
                Number(status) !== 1)
        ) {
            return res.status(400).json({
                success: false,
                message: "Status must be 0 or 1"
            });
        }


        const affectedRows =
            await reviewModel.updateReviewStatus(
                reviewId,
                Number(status)
            );


        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Review status updated successfully"
        });

    } catch (error) {

        console.error(
            "Update review status error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to update review status"
        });
    }
};


// Admin delete review
const adminDeleteReview = async (req, res) => {

    try {

        const { reviewId } = req.params;


        // Validate review ID
        if (!reviewId) {
            return res.status(400).json({
                success: false,
                message: "Review ID is required"
            });
        }


        const affectedRows =
            await reviewModel.adminDeleteReview(
                reviewId
            );


        if (affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found or already deleted"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {

        console.error(
            "Admin delete review error:",
            error
        );

        return res.status(500).json({
            success: false,
            message: "Failed to delete review"
        });
    }
};



module.exports = {
    createReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview,
    getAllReviews,
    updateReviewStatus,
    adminDeleteReview
};