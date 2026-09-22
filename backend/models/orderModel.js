const { mysqlPool } = require("../config/db");


const createOneOrder = async (orderData, items, clearCustomerCart = false) => {

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
        shippingAmount,
        paymentMethod,
        customerComment,
        createdBy
    } = orderData;

    const connection = await mysqlPool.getConnection();
    try {
        await connection.beginTransaction();

        const verifiedItems = [];
        let subtotal = 0;


        // Lock every product row before calculating the final order amount.
        // This prevents stock races and keeps the order snapshot consistent.
        for (const item of items) {
            const [productRows] = await connection.execute(
                `SELECT
                    product_id AS productId,
                    product_name AS productName,
                    sku,
                    price,
                    quantity,
                    status
                 FROM product
                 WHERE product_id = ?
                   AND deleted_at IS NULL
                 FOR UPDATE`,
                [item.productId]
            );

            const product = productRows[0];

            if (!product || Number(product.status) !== 1) {
                throw new Error(
                    `Product ${item.productId} is unavailable`
                );
            }

            const quantity = Number(item.quantity);

            if (
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                throw new Error(
                    `Invalid quantity for product ${item.productId}`
                );
            }

            if (quantity > Number(product.quantity)) {
                throw new Error(
                    `Insufficient stock for ${product.productName}. Available: ${product.quantity}`
                );
            }

            const price = Number(product.price);
            const total = price * quantity;

            subtotal += total;

            verifiedItems.push({
                productId: product.productId,
                productName: product.productName,
                sku: product.sku,
                price,
                quantity,
                total
            });
        }


        const shipping = Number(shippingAmount) || 0;
        const totalAmount = subtotal + shipping


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
            subtotal,
            shippingAmount,
            totalAmount,
            paymentMethod || "cod",
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

        for (const item of verifiedItems) {
            const [stockResult] = await connection.execute(
                //  SET quantity = quantity - ?  => customer yevlo qut venumo adha db la irundhu dlt panudhu 
                // WHERE product_id = ?  =>customer enna product ahh select panuraru nu productId vachu db la select panna 
                // AND quantity >= ? =>  edhu yedhuku naa customer choose panna alavu db la iruka nu pakuradhuku
                `UPDATE product
                 SET quantity = quantity - ?
                 WHERE product_id = ?
                 AND deleted_at IS NULL
                 AND quantity >= ?`,
                [
                    item.quantity,
                    item.productId,
                    item.quantity
                ]
            );
            if (stockResult.affectedRows === 0) {
                throw new Error(
                    `Insufficient stock for ${item.productName}`
                );
            }

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

        // DELETE ci, FROM cart_item=ci /cart_item ahh dlt pannu 
        //INNER JOIN cart c ON c.cartId = ci.cartId inner joint panitu /cart table-oda cartId and cart_item table-oda cartId same-ah irukkura records-a connect pannu.
        //WHERE c.customerId = ? customerIId ku atch aagura cart items mattum select/delete pannu.

        if (clearCustomerCart) {        // cart clear panna venduma?

            await connection.execute(   // DB query execute panni wait pannu

                `DELETE ci
                 FROM cart_item ci
                 INNER JOIN cart c
                    ON c.cartId = ci.cartId
                 WHERE c.customerId = ?`,

                [customerId]             // ? = customerId
            );
        }

        await connection.commit();       // transaction changes final-ah save pannu

            return {                         // result return pannu
                 orderId,                     // orderId
                 subtotal,                    // subtotal
                 shippingAmount: shipping,    // shipping variable → shippingAmount
                 totalAmount,                 // total amount
            ...orderResult               // orderResult values-um add pannu
        };

    } catch (error) {                // error vandha
        await connection.rollback(); // changes ellam undo pannu
        throw error;                 // error-a caller/controller-ku anuppu
    } finally {                      // success/error, rendu case-layum
        connection.release();        // DB connection pool-ku return pannu
    }
};


const getAllOrders = async () => {

    const sql = /*sql*/`
        SELECT
            o.order_id AS orderId,
            o.order_number AS orderNumber,
            o.customer_id AS customerId,
            CONCAT(c.first_name, ' ', c.last_name) AS customerName,
            c.email AS customerEmail,
            o.subtotal,
            o.shipping_amount AS shippingAmount,
            o.total_amount AS totalAmount,
            o.payment_method AS paymentMethod,
            o.payment_status AS paymentStatus,
            o.order_status AS orderStatus,
            o.shipping_status AS shippingStatus,
            o.tracking_number AS trackingNumber,
            o.created_at AS createdAt
        FROM \`order\` o
        INNER JOIN customer c
            ON c.customer_id = o.customer_id
        WHERE o.deleted_at IS NULL
        ORDER BY o.order_id DESC
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

const updateOrderStatus = async (
    orderId,
    orderStatus,
    shippingStatus,
    paymentStatus,
    trackingNumber,
    updatedBy
) => {
    const sql = /*sql*/`
        UPDATE \`order\`
        SET
            order_status = ?,
            shipping_status = ?,
            payment_status = ?,
            tracking_number = ?,
            updated_by = ?
        WHERE order_id = ?
          AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(sql, [
        orderStatus,
        shippingStatus,
        paymentStatus,
        trackingNumber || null,
        updatedBy || null,
        orderId
    ]);

    return result;
};

module.exports = {
    createOneOrder,
    getAllOrders,
    getOrdersByCustomerId,
    updateOrderStatus
}
