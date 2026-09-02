const { mysqlPool } = require("../config/db");
const {getAddressById}= require("../models/customerAdddressModel")

const createOneOrder = async (orderData, items) => {

    const {
        orderNumber,
        customerId,
        billingFirstName,
        billingLastName,
        billingCompany,
        billingAddress1,
        billingAddress2,
        billingCity,
        billingState,
        billingPostcode,
        billingCountry,
        billingPhoneNumber,
        shippingFirstName,
        shippingLastName,
        shippingCompany,
        shippingAddress1,
        shippingAddress2,
        shippingCity,
        shippingState,
        shippingPostCode,
        shippingCountry,
        shippingPhoneNumber,
        subtotal,
        shippingAmount,
        totalAmount,
        paymentMethod,
        customerComment,
        createdBy
    } = orderData;

    const connection = await mysqlPool.getConnection();
    try {
        await connection.beginTransaction();

        const orderSql = /*sql*/`
            INSERT INTO \`order\`
            (
                order_number,
                customer_id,
                billing_first_name,
                billing_last_name,
                billing_company,
                billing_address_1,
                billing_address_2,
                billing_city,
                billing_state,
                billing_postcode,
                billing_country,
                billing_phoneNumber,
                shipping_first_name,
                shipping_last_name,
                shipping_company,
                shipping_address_1,
                shipping_address_2,
                shipping_city,
                shipping_state,
                shipping_postcode,
                shipping_country,
                shipping_phoneNumber,
                subtotal,
                shipping_amount,
                total_amount,
                payment_method,
                customer_comment,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [orderResult] = await connection.execute(orderSql, [
            orderNumber,
            customerId,
            billingFirstName,
            billingLastName,
            billingCompany,
            billingAddress1,
            billingAddress2,
            billingCity,
            billingState,
            billingPostcode,
            billingCountry,
            billingPhoneNumber,
            shippingFirstName,
            shippingLastName,
            shippingCompany,
            shippingAddress1,
            shippingAddress2,
            shippingCity,
            shippingState,
            shippingPostCode,
            shippingCountry,
            shippingPhoneNumber,
            subtotal || 0,
            shippingAmount || 0,
            totalAmount || 0,
            paymentMethod,
            customerComment || null,
            createdBy || null
        ]);

        const orderId = orderResult.insertId;

        const itemSql = /*sql*/`
            INSERT INTO order_product
            (
                order_id,
                product_id,
                product_name,
                sku,
                price,
                quantity,
                total
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        for (const item of items) {
            await connection.execute(itemSql, [
                orderId,
                item.productId,
                item.productName,
                item.sku,
                item.price,
                item.quantity,
                item.total
            ]);
        }

        await connection.commit();

        return { orderId, ...orderResult };

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};



const getAllOrders = async () => {

    const sql = /*sql*/`
        SELECT
            order_id AS orderId,
            order_number AS orderNumber,
            customer_id AS customerId,
            total_amount AS totalAmount,
            payment_status AS paymentStatus,
            order_status AS orderStatus,
            shipping_status AS shippingStatus,
            tracking_number AS trackingNumber,
            created_at AS createdAt
        FROM \`order\`
        WHERE deleted_at IS NULL
        ORDER BY order_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql);

    return rows;
};

const getOrdersByCustomerId = async (customerId) => {

    const sql = /*sql*/`
        SELECT
            order_id AS orderId,
            order_number AS orderNumber,
            total_amount AS totalAmount,
            payment_status AS paymentStatus,
            order_status AS orderStatus,
            shipping_status AS shippingStatus,
            tracking_number AS trackingNumber,
            created_at AS createdAt
        FROM \`order\`
        WHERE customer_id = ?
        AND deleted_at IS NULL
        ORDER BY order_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql, [customerId]);

    return rows;
};

module.exports={
    createOneOrder,
    getAllOrders,
    getOrdersByCustomerId
}
