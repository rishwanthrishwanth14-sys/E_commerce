const {
    mysqlPool
} = require("../config/db");


const createOneCustomerAddress = async (addressData) => {

    const {
        customerId,
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        postcode,
        country,
        phoneNumber,
        createdBy
    } = addressData;

    const sql = /*sql*/`
    INSERT INTO customer_address
    (
        customer_id,
        first_name,
        last_name,
        company,
        address_1,
        address_2,
        city,
        state,
        postcode,
        country,
        phoneNumber,
        created_by
    )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [
            customerId,
            firstName,
            lastName,
            company || null,
            address1,
            address2 || null,
            city,
            state,
            postcode,
            country,
            phoneNumber || null,
            createdBy || customerId
        ]);

    return result;
};

// all addresses belonging to a customer
const getEveryAddressesOfCustomer = async (customerId) => {

    const sql = /*sql*/`
    SELECT
        customer_id as customerId,
        address_id as addressId,
        first_name as firstName,
        last_name as lastName,
        company,
        address_1 as address1,
        address_2 as address2,
        city,
        state,
        postcode,
        country,
        phoneNumber,
        created_at AS createdAt,
        updated_at AS updatedAt
    FROM customer_address
    WHERE customer_id = ?
    AND deleted_at IS NULL
    ORDER BY address_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql, [customerId]);

    return rows;
};


// get a single address that belongs to a customer
const getAddressById = async (
    addressId,
    customerId
) => {

    const sql = /*sql*/`SELECT
        address_id as addressId,
        customer_id as customerId,
        first_name as firstName,
        last_name as lastName,
        company,
        address_1 AS address1,
        address_2 AS address2,
        city,
        state,
        postcode,
        country,
        phoneNumber,
        created_at AS createdAt,
        updated_at AS updatedAt
    FROM customer_address
    WHERE address_id = ?
    AND customer_id = ?
    AND deleted_at IS NULL
    LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(sql, [addressId, customerId]);

    return rows[0];
};

const updateCustomerAddress = async (
    addressId,
    customerId,
    addressData
) => {
    const {
        firstName,
        lastName,
        company,
        address1,
        address2,
        city,
        state,
        postcode,
        country,
        phoneNumber,
        updatedBy
    } = addressData;

    const sql = /*sql*/`
    UPDATE customer_address
    SET
            first_name = ?,
            last_name = ?,
            company = ?,
            address_1 = ?,
            address_2 = ?,
            city = ?,
            state = ?,
            postcode = ?,
            country = ?,
            phoneNumber = ?,
            updated_by = ?,
            updated_at = CURRENT_TIMESTAMP
    WHERE address_id = ?
    AND customer_id = ?
    AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(sql,
        [
            firstName,
            lastName,
            company || null,
            address1,
            address2 || null,
            city,
            state,
            postcode,
            country,
            phoneNumber || null,
            updatedBy || customerId,
            addressId,
            customerId
        ]);
    return result;
};

const deleteAddressForCustomer = async (
    addressId,
    customerId
) => {

    const sql = /*sql*/`
         UPDATE customer_address
        SET
            deleted_at = CURRENT_TIMESTAMP,
            deleted_by = ?
        WHERE address_id = ?
        AND customer_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [customerId, addressId, customerId]
    );

    return result;
};


module.exports = {
    createOneCustomerAddress,
    getEveryAddressesOfCustomer,
    getAddressById,
    updateCustomerAddress,
    deleteAddressForCustomer
};
