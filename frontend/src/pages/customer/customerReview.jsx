
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
    createReview,
    getProductReviews
} from "../../service/reviewService";
import "./customerReview.css";

const StarRating = ({ value, onChange, readOnly = false }) => (
    <div
        className={`review-stars ${readOnly ? "is-readonly" : ""}`}
        aria-label={`${value} out of 5 stars`}
    >
        {[1, 2, 3, 4, 5].map((star) => (
            <button
                key={star}
                type="button"
                disabled={readOnly}
                onClick={() => onChange?.(star)}
                className={star <= value ? "star active" : "star"}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
            >
                ★
            </button>
        ))}
    </div>
);

const formatDate = (value) => {
    if (!value) return "Recently";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? "Recently"
        : date.toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
              year: "numeric"
          });
};

export default function ProductReview() {
    const { productId } = useParams();
    const location = useLocation();

    // Shop page: view only.
    // My Orders: /customer/review/:productId?write=true
    const writeMode =
        new URLSearchParams(location.search).get("write") === "true";

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    const loadReviews = useCallback(async () => {
        if (!productId) {
            setReviews([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await getProductReviews(productId);

            setReviews(
                Array.isArray(result.reviews) ? result.reviews : []
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Reviews couldn't be loaded. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        loadReviews();
    }, [loadReviews]);

    const summary = useMemo(() => {
        const count = reviews.length;

        const average = count
            ? reviews.reduce(
                  (sum, item) => sum + Number(item.rating || 0),
                  0
              ) / count
            : 0;

        const distribution = [5, 4, 3, 2, 1].map((stars) => ({
            stars,
            count: reviews.filter(
                (item) => Number(item.rating) === stars
            ).length
        }));

        return { count, average, distribution };
    }, [reviews]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setNotice("");

        if (!reviewText.trim()) {
            setError("Please write a few words about the product.");
            return;
        }

        if (reviewText.trim().length < 5) {
            setError("Your review must be at least 5 characters long.");
            return;
        }

        setSubmitting(true);

        try {
            await createReview({
                productId: Number(productId),
                rating,
                reviewText: reviewText.trim()
            });

            setReviewText("");
            setRating(5);
            setNotice("Thanks! Your review has been submitted.");

            await loadReviews();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Your review couldn't be submitted. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!productId) {
        return (
            <main className="review-page">
                <div className="review-message">
                    <h1>Choose a product first</h1>
                    <p>Open a product page to view its reviews.</p>
                    <Link className="review-back-link" to="/customer/shop">
                        Browse products
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="review-page">
            <div className="review-page-inner">
                <Link
                    className="review-back-link"
                    to={
                        writeMode
                            ? "/customer/orders"
                            : `/customer/product/${productId}`
                    }
                >
                    ← {writeMode ? "Back to orders" : "Back to product"}
                </Link>

                <header className="review-heading">
                    <div>
                        <span className="review-eyebrow">
                            CUSTOMER FEEDBACK
                        </span>
                        <h1>Reviews & ratings</h1>
                        <p>
                            Read customer experiences and ratings
                            before choosing a product.
                        </p>
                    </div>

                    <div className="review-total-pill">
                        {summary.count}{" "}
                        {summary.count === 1 ? "review" : "reviews"}
                    </div>
                </header>

                <section
                    className="review-overview"
                    aria-label="Review summary"
                >
                    <div className="review-average">
                        <strong>
                            {summary.count ? summary.average.toFixed(1) : "—"}
                        </strong>
                        <StarRating
                            value={Math.round(summary.average)}
                            readOnly
                        />
                        <span>
                            {summary.count
                                ? `Based on ${summary.count} ${
                                      summary.count === 1
                                          ? "review"
                                          : "reviews"
                                  }`
                                : "No ratings yet"}
                        </span>
                    </div>

                    <div className="review-breakdown">
                        {summary.distribution.map(({ stars, count }) => (
                            <div className="review-bar-row" key={stars}>
                                <span>{stars} star</span>
                                <div className="review-bar-track">
                                    <div
                                        className="review-bar-fill"
                                        style={{
                                            width: `${
                                                summary.count
                                                    ? (count / summary.count) * 100
                                                    : 0
                                            }%`
                                        }}
                                    />
                                </div>
                                <span>{count}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="review-content-grid">
                    {writeMode && (
                        <section className="review-form-card">
                            <span className="review-eyebrow">
                                YOUR EXPERIENCE
                            </span>
                            <h2>Write a review</h2>
                            <p className="review-muted">
                                Share what you liked about this product.
                            </p>

                            <form onSubmit={handleSubmit}>
                                <label className="review-field-label">
                                    Your rating
                                </label>

                                <div className="review-rating-input">
                                    <StarRating
                                        value={rating}
                                        onChange={setRating}
                                    />
                                    <span>
                                        {
                                            [
                                                "",
                                                "Poor",
                                                "Fair",
                                                "Good",
                                                "Very good",
                                                "Excellent"
                                            ][rating]
                                        }
                                    </span>
                                </div>

                                <label
                                    className="review-field-label"
                                    htmlFor="review-text"
                                >
                                    Your review
                                </label>

                                <textarea
                                    id="review-text"
                                    value={reviewText}
                                    onChange={(event) =>
                                        setReviewText(event.target.value)
                                    }
                                    maxLength={1500}
                                    rows={6}
                                    placeholder="What was your experience with this product?"
                                    required
                                />

                                <div className="review-character-count">
                                    {reviewText.length}/1500 characters
                                </div>

                                {error && (
                                    <div className="review-alert error" role="alert">
                                        {error}
                                    </div>
                                )}

                                {notice && (
                                    <div
                                        className="review-alert success"
                                        role="status"
                                    >
                                        {notice}
                                    </div>
                                )}

                                <button
                                    className="review-submit"
                                    type="submit"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting review…"
                                        : "Submit review"}
                                </button>

                                <p className="review-form-note">
                                    The server must verify purchase eligibility
                                    before accepting your review.
                                </p>
                            </form>
                        </section>
                    )}

                    <section className="review-list-section">
                        <div className="review-list-heading">
                            <div>
                                <span className="review-eyebrow">
                                    COMMUNITY VOICES
                                </span>
                                <h2>What customers say</h2>
                            </div>
                            <span className="review-count">
                                {summary.count}
                            </span>
                        </div>

                        {loading ? (
                            <div className="review-state">
                                <span className="review-spinner" />
                                Loading reviews…
                            </div>
                        ) : error && reviews.length === 0 ? (
                            <div className="review-state">
                                <p>{error}</p>
                                <button
                                    type="button"
                                    className="review-retry"
                                    onClick={loadReviews}
                                >
                                    Try again
                                </button>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="review-empty">
                                <div className="review-empty-icon">★</div>
                                <h3>No reviews yet</h3>
                                <p>
                                    There are no reviews for this product yet.
                                </p>
                            </div>
                        ) : (
                            <div className="review-cards">
                                {reviews.map((review) => (
                                    <article
                                        className="review-card"
                                        key={
                                            review.reviewId ?? review.review_id
                                        }
                                    >
                                        <div className="review-card-top">
                                            <div className="review-avatar">
                                                {(
                                                    review.firstName ||
                                                    review.first_name ||
                                                    "C"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="review-author">
                                                <h3>
                                                    {[
                                                        review.firstName ??
                                                            review.first_name,
                                                        review.lastName ??
                                                            review.last_name
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" ") || "Customer"}
                                                </h3>
                                                <span>
                                                    {formatDate(
                                                        review.createdAt ??
                                                            review.created_at
                                                    )}
                                                </span>
                                            </div>

                                            {Number(
                                                review.isVerifiedPurchase ??
                                                    review.is_verified_purchase
                                            ) === 1 && (
                                                <span className="verified-badge">
                                                    ✓ Verified purchase
                                                </span>
                                            )}
                                        </div>

                                        <StarRating
                                            value={Number(review.rating)}
                                            readOnly
                                        />

                                        <p className="review-card-text">
                                            {review.reviewText ??
                                                review.review_text}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>
                </section>
            </div>
        </main>
    );
}
