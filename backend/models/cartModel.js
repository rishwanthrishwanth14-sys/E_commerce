const {
    mysqlPool,
} = require("../config/db");


// GET OR CREATE CART
const getOrCreateCart = async (customerId) => {

    const sql = /*sql*/`
        SELECT
            cartId,
            customerId
        FROM cart
        WHERE customerId = ?
        LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(
        sql,
        [customerId]
    );

    if (rows[0]) {
        return rows[0];
    }

    const insertSql = /*sql*/`
        INSERT INTO cart
        (
            customerId
        )
        VALUES (?)
    `;

    const [result] = await mysqlPool.execute(
        insertSql,
        [customerId]
    );

    return {
        cartId: result.insertId,
        customerId
    };
};


// GET CART BY CUSTOMER ID
const getCartByCustomerId = async (customerId) => {

    const cart = await getOrCreateCart(customerId);

    const sql = /*sql*/`
        SELECT
            ci.cartItemId AS cartItemId,
            ci.cartId AS cartId,
            ci.productId AS productId,
            ci.quantity AS quantity,

            p.product_name AS productName,
            p.sku AS sku,
            p.price AS price,
            p.quantity AS availableQuantity,
            p.status AS productStatus,

            (
                SELECT
                    pi.image
                FROM product_image pi
                WHERE pi.product_id = p.product_id
                AND pi.deleted_at IS NULL
                AND pi.status = 1
                ORDER BY
                    pi.sort_order ASC,
                    pi.image_id ASC
                LIMIT 1
            ) AS image

        FROM cart_item ci

        INNER JOIN product p
            ON p.product_id = ci.productId

        WHERE ci.cartId = ?
        AND p.deleted_at IS NULL

        ORDER BY ci.cartItemId DESC
    `;

    const [rows] = await mysqlPool.execute(
        sql,
        [cart.cartId]
    );

    return {
        cartId: cart.cartId,
        customerId,
        items: rows
    };
};


// ADD CART ITEM
const addCartItem = async (
    customerId,
    productId,
    quantity
) => {

    const cart = await getOrCreateCart(customerId);

    // GET PRODUCT
    const productSql = /*sql*/`
        SELECT
            product_id AS productId,
            quantity,
            status
        FROM product
        WHERE product_id = ?
        AND deleted_at IS NULL
        LIMIT 1
    `;

    const [products] = await mysqlPool.execute(
        productSql,
        [productId]
    );

    const product = products[0];

    if (
        !product ||
        Number(product.status) !== 1
    ) {
        return {
            error: "PRODUCT_NOT_FOUND"
        };
    }


    // VALIDATE QUANTITY
    const requestedQuantity = Number(quantity);

    if (
        !Number.isInteger(requestedQuantity) ||
        requestedQuantity < 1
    ) {
        return {
            error: "INVALID_QUANTITY"
        };
    }


    // CHECK STOCK
    if (
        requestedQuantity >
        Number(product.quantity)
    ) {
        return {
            error: "INSUFFICIENT_STOCK",
            availableQuantity: Number(product.quantity)
        };
    }


    // CHECK EXISTING CART ITEM
    const existingSql = /*sql*/`
        SELECT
            quantity
        FROM cart_item
        WHERE cartId = ?
        AND productId = ?
        LIMIT 1
    `;

    const [existing] = await mysqlPool.execute(
        existingSql,
        [
            cart.cartId,
            productId
        ]
    );


    // UPDATE EXISTING ITEM
    if (existing[0]) {

        const newQuantity =
            Number(existing[0].quantity) +
            requestedQuantity;

        if (
            newQuantity >
            Number(product.quantity)
        ) {
            return {
                error: "INSUFFICIENT_STOCK",
                availableQuantity: Number(product.quantity)
            };
        }

        const updateSql = /*sql*/`
            UPDATE cart_item
            SET
                quantity = ?,
                updatedAt = CURRENT_TIMESTAMP
            WHERE cartId = ?
            AND productId = ?
        `;

        await mysqlPool.execute(
            updateSql,
            [
                newQuantity,
                cart.cartId,
                productId
            ]
        );

    } else {

        // CREATE NEW CART ITEM
        const insertSql = /*sql*/`
            INSERT INTO cart_item
            (
                cartId,
                productId,
                quantity
            )
            VALUES (?, ?, ?)
        `;

        await mysqlPool.execute(
            insertSql,
            [
                cart.cartId,
                productId,
                requestedQuantity
            ]
        );
    }

    return getCartByCustomerId(customerId);
};


// UPDATE CART ITEM
const updateCartItem = async (
    customerId,
    cartItemId,
    quantity
) => {

    // VALIDATE QUANTITY
    const requestedQuantity = Number(quantity);

    if (
        !Number.isInteger(requestedQuantity) ||
        requestedQuantity < 1
    ) {
        return {
            error: "INVALID_QUANTITY"
        };
    }


    // GET CART ITEM
    const sql = /*sql*/`
        SELECT
            ci.cartItemId,
            p.quantity AS availableQuantity,
            p.status AS productStatus,
            p.deleted_at AS deletedAt

        FROM cart_item ci

        INNER JOIN cart c
            ON c.cartId = ci.cartId

        INNER JOIN product p
            ON p.product_id = ci.productId

        WHERE ci.cartItemId = ?
        AND c.customerId = ?

        LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(
        sql,
        [
            cartItemId,
            customerId
        ]
    );

    const item = rows[0];

    if (!item) {
        return {
            error: "ITEM_NOT_FOUND"
        };
    }


    // CHECK PRODUCT STATUS
    if (
        Number(item.productStatus) !== 1 ||
        item.deletedAt
    ) {
        return {
            error: "PRODUCT_NOT_AVAILABLE"
        };
    }


    // CHECK STOCK
    if (
        requestedQuantity >
        Number(item.availableQuantity)
    ) {
        return {
            error: "INSUFFICIENT_STOCK",
            availableQuantity: Number(item.availableQuantity)
        };
    }


    // UPDATE CART ITEM
    const updateSql = /*sql*/`
        UPDATE cart_item ci

        INNER JOIN cart c
            ON c.cartId = ci.cartId

        SET
            ci.quantity = ?,
            ci.updatedAt = CURRENT_TIMESTAMP

        WHERE ci.cartItemId = ?
        AND c.customerId = ?
    `;

    await mysqlPool.execute(
        updateSql,
        [
            requestedQuantity,
            cartItemId,
            customerId
        ]
    );

    return getCartByCustomerId(customerId);
};


// DELETE CART ITEM
const removeCartItem = async (
    customerId,
    cartItemId
) => {

    const sql = /*sql*/`
        DELETE ci
        FROM cart_item ci

        INNER JOIN cart c
            ON c.cartId = ci.cartId

        WHERE ci.cartItemId = ?
        AND c.customerId = ?
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [
            cartItemId,
            customerId
        ]
    );

    return result;
};


// CLEAR CART
const clearCart = async (customerId) => {

    const sql = /*sql*/`
        DELETE ci
        FROM cart_item ci

        INNER JOIN cart c
            ON c.cartId = ci.cartId

        WHERE c.customerId = ?
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [customerId]
    );

    return result;
};


module.exports = {
    getCartByCustomerId,
    addCartItem,
    updateCartItem,
    removeCartItem,
    clearCart
};