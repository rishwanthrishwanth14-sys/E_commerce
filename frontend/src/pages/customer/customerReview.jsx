import { useEffect, useState } from "react";
import {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} from "../../service/reviewService";
import "./customerReview.css"

const ProductReview = ({ productId }) => {

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const [loading, setLoading] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const loadReviews = async () => {
        try {
            const response = await getProductReviews(productId);

            setReviews(response.reviews || []);
        } catch (error) {
            console.error("Failed to load reviews:", error);
        }
    };

    useEffect(() => {
        if (productId) {
            loadReviews();
        }
    }, [productId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!reviewText.trim()) {
            alert("Please write a review");
            return;
        }

        try {
            setLoading(true);

            if (editingId) {
                await updateReview(editingId, {
                    rating,
                    reviewText
                });
            } else {
                await createReview({
                    productId,
                    rating,
                    reviewText
                });
            }

            setRating(5);
            setReviewText("");
            setEditingId(null);

            await loadReviews();

        } catch (error) {
            console.error("Review error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (review) => {
        setEditingId(review.review_id);
        setRating(review.rating);
        setReviewText(review.review_text || "");
    };

    const handleDelete = async (reviewId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteReview(reviewId);

            await loadReviews();

        } catch (error) {
            console.error("Delete review error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete review"
            );
        }
    };

    return (
        <div className="product-review">

            <h3>Customer Reviews</h3>

            {/* Review Form */}

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Rating</label>

                    <select
                        value={rating}
                        onChange={(e) =>
                            setRating(Number(e.target.value))
                        }
                    >
                        <option value={5}>5 - Excellent</option>
                        <option value={4}>4 - Very Good</option>
                        <option value={3}>3 - Good</option>
                        <option value={2}>2 - Average</option>
                        <option value={1}>1 - Poor</option>
                    </select>
                </div>

                <div>
                    <label>Review</label>

                    <textarea
                        value={reviewText}
                        onChange={(e) =>
                            setReviewText(e.target.value)
                        }
                        placeholder="Write your review..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Submitting..."
                        : editingId
                            ? "Update Review"
                            : "Submit Review"
                    }
                </button>

                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setRating(5);
                            setReviewText("");
                        }}
                    >
                        Cancel
                    </button>
                )}

            </form>

            {/* Reviews List */}

            <div className="reviews-list">

                {reviews.length === 0 ? (
                    <p>No reviews yet.</p>
                ) : (
                    reviews.map((review) => (

                        <div
                            className="review-card"
                            key={review.review_id}
                        >

                            <h4>
                                {review.first_name}{" "}
                                {review.last_name}
                            </h4>

                            <div>
                                Rating: {review.rating}/5
                            </div>

                            <p>
                                {review.review_text}
                            </p>

                            {review.is_verified_purchase === 1 && (
                                <span>
                                    Verified Purchase
                                </span>
                            )}

                            <div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleEdit(review)
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            review.review_id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>

                        </div>

                    ))
                )}

            </div>

        </div>
    );
};

export default ProductReview;