const {
    mysqlPool
}=require("../config/db");

const createOneProductImage =async(imageData)=>{
    const{
        productId,
        image,
        sortOrder,
        status,
        createdBy
    }=imageData

    const sql =/*sql*/`
    INSERT INTO product_image
    (
    product_id,
    image,
    sort_order,
    status,
    created_by
    )
    values (?, ?, ?, ?, ?)
    `;

    const [result]=await mysqlPool.execute(
        sql,
        [
            productId,
            image,
            sortOrder || 0,
            status ?? 1 ,
            createdBy || null
        ]);
    return result
}; 

const createManyProductImages = async (productId,images,createdBy)=>{

    if(!images|| images.length === 0) return [];


    const results = [];
    
    for(i=0; i<images.length; i++){
        const result = await createOneProductImge({
            productId,
            image :images[i].image,
            sortOrder: images[i].sortOrder ?? i,
            status:1,
            createdBy
        })
        results.push(result)
    }
    return results
}

// GET ALL IMAGES FOR A PRODUCT
const getImagesByProductId = async (productId) => {

    const sql = /*sql*/`
        SELECT
            image_id AS imageId,
            product_id AS productId,
            image,
            sort_order AS sortOrder,
            status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM product_image
        WHERE product_id = ?
        AND deleted_at IS NULL
        ORDER BY sort_order ASC
    `;

    const [rows] = await mysqlPool.execute(sql, [productId]);

    return rows;
};

// GET SINGLE IMAGE BY IMAGE ID
const getImageById = async (imageId) => {

    const sql = /*sql*/`
        SELECT
            image_id AS imageId,
            product_id AS productId,
            image,
            sort_order AS sortOrder,
            status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM product_image
        WHERE image_id = ?
        AND deleted_at IS NULL
        LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(sql, [imageId]);

    return rows[0];
};


// UPDATE IMAGE (sort order / status maathurathu)
const updateProductImageById = async (
    imageId,
    imageData
) => {

    const {
        sortOrder,
        status,
        updatedBy
    } = imageData;

    const sql = /*sql*/`
        UPDATE product_image
        SET
            sort_order = ?,
            status = ?,
            updated_by = ?
        WHERE image_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(sql, [
        sortOrder || 0,
        status,
        updatedBy || null,
        imageId
    ]);

    return result;
};


// DELETE SINGLE IMAGE - SOFT DELETE
const deleteImageById = async (
    imageId,
    deletedBy
) => {

    const sql = /*sql*/`
        UPDATE product_image
        SET
            deleted_at = CURRENT_TIMESTAMP,
            deleted_by = ?,
            status = 0
        WHERE image_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [
            deletedBy,
            imageId
        ]
    );

    return result;
};


// DELETE ALL IMAGES OF A PRODUCT - SOFT DELETE
const deleteImagesByProductId = async (
    productId,
    deletedBy
) => {

    const sql = /*sql*/`
        UPDATE product_image
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
    createOneProductImage,
    createManyProductImages,
    getImagesByProductId,
    getImageById,
    updateProductImageById,
    deleteImageById,
    deleteImagesByProductId
};