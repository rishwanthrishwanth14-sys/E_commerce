const {
    mysqlPool,
} = require("../config/db");


// CREATE CATEGORY
const createOneCategory = async (categoryData) => {

    const {
        categoryName,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
        parent,
        image,
        sortOrder,
        status,
        seoUrl,
        createdBy
    } = categoryData;

    const sql = /*sql*/`
        INSERT INTO category
        (
            category_name,
            description,
            meta_title,
            meta_description,
            meta_keywords,
            parent,
            image,
            sort_order,
            status,
            seo_url,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await mysqlPool.execute(
        sql, [
        categoryName,
        description || null,
        metaTitle || null,
        metaDescription || null,
        metaKeywords || null,
        parent || null,
        image || null,
        sortOrder || 0,
        status,
        seoUrl || null,
        createdBy || null
    ]);

    return result;
};


// GET ALL CATEGORIES
const getAllCategories = async () => {

    const sql = /*sql*/`
        SELECT
            category_id AS categoryId,
            category_name AS categoryName,
            description,
            meta_title AS metaTitle,
            meta_description AS metaDescription,
            meta_keywords AS metaKeywords,
            parent,
            image,
            sort_order AS sortOrder,
            status,
            seo_url AS seoUrl,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM category
        WHERE deleted_at IS NULL
        ORDER BY sort_order ASC, category_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql);

    return rows;
};


// GET CATEGORY BY ID
const getCategoryById = async (categoryId) => {

    const sql = /*sql*/`
        SELECT
            category_id AS categoryId,
            category_name AS categoryName,
            description,
            meta_title AS metaTitle,
            meta_description AS metaDescription,
            meta_keywords AS metaKeywords,
            parent,
            image,
            sort_order AS sortOrder,
            status,
            seo_url AS seoUrl,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM category
        WHERE category_id = ?
        AND deleted_at IS NULL
        LIMIT 1 
    `;

    const [rows] = await mysqlPool.execute(sql, [categoryId]);

    return rows[0];
};


// UPDATE CATEGORY
const updateCategoryById = async (
    categoryId,
    categoryData
) => {

    const {
        categoryName,
        description,
        metaTitle,
        metaDescription,
        metaKeywords,
        parent,
        image,
        sortOrder,
        status,
        seoUrl,
        updatedBy
    } = categoryData;

    const sql = /*sql*/`
        UPDATE category
        SET
            category_name = ?,
            description = ?,
            meta_title = ?,
            meta_description = ?,
            meta_keywords = ?,
            parent = ?,
            image = ?,
            sort_order = ?,
            status = ?,
            seo_url = ?,
            updated_by = ?
        WHERE category_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(sql, [
        categoryName,
        description || null,
        metaTitle,
        metaDescription || null,
        metaKeywords || null,
        parent || null,
        image || null,
        sortOrder || 0,
        status,
        seoUrl || null,
        updatedBy || null,
        categoryId
    ]);

    return result;
};


// DELETE CATEGORY - SOFT DELETE
const deleteCategoryById = async (
    categoryId,
    deletedBy
) => {

    const sql = /*sql*/`
        UPDATE category
        SET
            deleted_at = CURRENT_TIMESTAMP,
            deleted_by = ?,
            status = 0
        WHERE category_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [
            deletedBy,
            categoryId
        ]
    );

    return result;
};


module.exports = {
    createOneCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
