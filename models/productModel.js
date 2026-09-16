const {
    mysqlPool,
} = require("../config/db");


// CREATE PRODUCT
const createOneProduct = async (productData) => {

    const {
        productName,
        description,
        categoryId,
        sku,
        price,
        quantity,
        image,
        sortOrder,
        status,
        metaTitle,
        metaDescription,
        metaKeywords,
        createdBy
    } = productData;

    const sql = /*sql*/`
        INSERT INTO product
        (
            product_name,
            description,
            category_id,
            sku,
            price,
            quantity,
            image,
            sort_order,
            status,
            meta_title,
            meta_description,
            meta_keywords,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await mysqlPool.execute(
        sql, [
        productName,
        description || null,
        categoryId,
        sku,
        price,
        quantity || 0,
        image || null,
        sortOrder || 0,
        status,
        metaTitle || null,
        metaDescription || null,
        metaKeywords || null,
        createdBy || null
    ]);

    return result;
};


// GET ALL PRODUCTS
const getAllProducts = async () => {

    const sql = /*sql*/`
        SELECT
            product_id AS productId,
            product_name AS productName,
            description,
            category_id AS categoryId,
            sku,
            price,
            quantity,
            image,
            sort_order AS sortOrder,
            status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM product
        WHERE deleted_at IS NULL
        ORDER BY product_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql);

    return rows;
};


// GET PRODUCT BY ID
const getProductById = async (productId) => {

    const sql = /*sql*/`
        SELECT
            product_id AS productId,
            product_name AS productName,
            description,
            category_id AS categoryId,
            sku,
            price,
            quantity,
            image,
            sort_order AS sortOrder,
            status,
            meta_title AS metaTitle,
            meta_description AS metaDescription,
            meta_keywords AS metaKeywords,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM product
        WHERE product_id = ?
        AND deleted_at IS NULL
        LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(sql, [productId]);

    return rows[0];
};


// UPDATE PRODUCT
const updateProductById = async (
    productId,
    productData
) => {

    const {
        productName,
        description,
        categoryId,
        sku,
        price,
        quantity,
        image,
        sortOrder,
        status,
        metaTitle,
        metaDescription,
        metaKeywords,
        updatedBy
    } = productData;

    const sql = /*sql*/`
        UPDATE product
        SET
            product_name = ?,
            description = ?,
            category_id = ?,
            sku = ?,
            price = ?,
            quantity = ?,
            image = ?,
            sort_order = ?,
            status = ?,
            meta_title = ?,
            meta_description = ?,
            meta_keywords = ?,
            updated_by = ?
        WHERE product_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(sql, [
        productName,
        description || null,
        categoryId,
        sku,
        price,
        quantity || 0,
        image || null,
        sortOrder || 0,
        status,
        metaTitle || null,
        metaDescription || null,
        metaKeywords || null,
        updatedBy || null,
        productId
    ]);

    return result;
};


// UPDATE STOCK ONLY (used after an order is placed)
const decrementProductQuantity = async (
    productId,
    quantity
) => {

    const sql = /*sql*/`
        UPDATE product
        SET quantity = quantity - ?
        WHERE product_id = ?
        AND deleted_at IS NULL
        AND quantity >= ?
    `;

    const [result] = await mysqlPool.execute(sql, [
        quantity,
        productId,
        quantity
    ]);

    return result;
};


// DELETE PRODUCT - SOFT DELETE
const deleteProductById = async (
    productId,
    deletedBy
) => {

    const sql = /*sql*/`
        UPDATE product
        SET
            deleted_at = CURRENT_TIMESTAMP,
            deleted_by = ?,
            status = 0
        WHERE product_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [
            deletedBy,
            productId
        ]
    );

    return result;
};


module.exports = {
    createOneProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    decrementProductQuantity,
    deleteProductById
};
