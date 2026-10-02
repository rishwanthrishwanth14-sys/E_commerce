const { mysqlPool } = require("../config/db");


// Create Review
const createReview = async (
    productId,
    customerId,
    rating,
    reviewText,
    isVerifiedPurchase
) => {

    const [result] = await mysqlPool.query(
        `
        INSERT INTO product_review (
            product_id,
            customer_id,
            rating,
            review_text,
            is_verified_purchase
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
            productId,
            customerId,
            rating,
            reviewText,
            isVerifiedPurchase
        ]
    );

    return result.insertId;
};


// Get all reviews for a product
const getProductReviews = async (productId) => {

    const [rows] = await mysqlPool.query(
        `
        SELECT
            pr.review_id AS reviewId,
            pr.product_id AS productId,
            pr.customer_id AS customerId,
            pr.rating,
            pr.review_text AS reviewText,
            pr.status,
            pr.is_verified_purchase AS isVerifiedPurchase,
            pr.created_at AS createdAt,
            pr.updated_at AS updatedAt,

            c.firstname,
            c.lastname

        FROM product_review pr

        INNER JOIN customer c
            ON pr.customer_id = c.customer_id

        WHERE pr.product_id = ?
        AND pr.status = 1

        ORDER BY pr.created_at DESC
        `,
        [productId]
    );

    return rows;
};


// Get one review
const getReviewById = async (reviewId) => {

    const [rows] = await mysqlPool.query(
        `
        SELECT
            review_id AS reviewId,
            product_id AS productId,
            customer_id AS customerId,
            rating,
            review_text AS reviewText,
            status,
            is_verified_purchase AS isVerifiedPurchase,
            created_at AS createdAt,
            updated_at AS updatedAt

        FROM product_review

        WHERE review_id = ?

        LIMIT 1
        `,
        [reviewId]
    );

    return rows[0];
};


// Update review
const updateReview = async (
    reviewId,
    customerId,
    rating,
    reviewText
) => {

    const [result] = await mysqlPool.query(
        `
        UPDATE product_review

        SET
            rating = ?,
            review_text = ?,
            updated_at = CURRENT_TIMESTAMP

        WHERE review_id = ?
        AND customer_id = ?
        AND status = 1
        `,
        [
            rating,
            reviewText,
            reviewId,
            customerId
        ]
    );

    return result.affectedRows;
};


// Delete review
const deleteReview = async (
    reviewId,
    customerId
) => {

    const [result] = await mysqlPool.query(
        `
        UPDATE product_review

        SET
            status = 0,
            updated_at = CURRENT_TIMESTAMP

        WHERE review_id = ?
        AND customer_id = ?
        AND status = 1
        `,
        [
            reviewId,
            customerId
        ]
    );

    return result.affectedRows;
};


// Check whether customer purchased the product
const checkVerifiedPurchase = async (
    customerId,
    productId
) => {

    const [rows] = await mysqlPool.query(
        `
        SELECT
            op.order_product_id

        FROM  \`order\` o

        INNER JOIN order_product op
            ON o.order_id = op.order_id

        WHERE o.customer_id = ?
        AND op.product_id = ?

        LIMIT 1
        `,
        [
            customerId,
            productId
        ]
    );

    return rows.length > 0;
};

// Get all reviews for admin
const getAllReviews = async () => {

    const [rows] = await mysqlPool.query(
        `
        SELECT
            pr.review_id AS reviewId,
            pr.product_id AS productId,
            pr.customer_id AS customerId,
            pr.rating,
            pr.review_text AS reviewText,
            pr.status,
            pr.is_verified_purchase AS isVerifiedPurchase,
            pr.created_at AS createdAt,
            pr.updated_at AS updatedAt,

            p.product_name AS productName,

            c.firstname,
            c.lastname

        FROM product_review pr

        INNER JOIN product p
            ON pr.product_id = p.product_id

        INNER JOIN customer c
            ON pr.customer_id = c.customer_id

        ORDER BY pr.created_at DESC
        `
    );

    return rows;
};


// Update review status
const updateReviewStatus = async (
    reviewId,
    status,
) => {

    const [result] = await mysqlPool.query(
        `
        UPDATE product_review

        SET
            status = ?,
            updated_at = CURRENT_TIMESTAMP

        WHERE review_id = ?
        `,
        [
            status,
            reviewId
        ]
    );

    return result.affectedRows;
};


// Admin delete review
const adminDeleteReview = async (
    reviewId
) => {

    const [result] = await mysqlPool.query(
        `
        UPDATE product_review

        SET
            status = 0,
            updated_at = CURRENT_TIMESTAMP

        WHERE review_id = ?
        AND status = 1
        `,
        [reviewId]
    );

    return result.affectedRows;
};


module.exports = {
    createReview,
    getProductReviews,
    getReviewById,
    updateReview,
    deleteReview,
    checkVerifiedPurchase,
    getAllReviews,
    updateReviewStatus,
    adminDeleteReview
};