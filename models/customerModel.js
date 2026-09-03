const { request } = require("express");
const {
    mysqlPool
} = require("../config/db")

//create customer

const createOneCustomer = async (customerData) => {

    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        company,
        address1,
        address2,
        city,
        state,
        postcode,
        country
    } = customerData

    const sql = /*sql*/`
    INSERT INTO customer
    (
        first_name,
        last_name,
        email,
        phoneNumber,
        password,
        company,
        address_1,
        address_2,
        city,
        state,
        postcode,
        country,
        status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    const [result] = await mysqlPool.execute(
        sql,
        [
            firstName,
            lastName,
            email,
            phoneNumber || null,
            password,
            company || null,
            address1 || null,
            address2 || null,
            city || null,
            state || null,
            postcode || null,
            country || null,
            1
        ]);
    return result;
};// get all customer 

const getAllCustomers = async () => {
    const sql = /*sql*/`
    SELECT  
        customer_id as customerId,
        first_name as firstName,
        last_name as lastName,
        email,
        phoneNumber as phoneNumber,
        city,
        state,
        country,
        status,
        created_at as createdAt
    FROM customer
    WHERE deleted_at IS NULL
    ORDER BY customer_id DESC
    `;
    const [rows] = await mysqlPool.execute(sql);

    return rows;
};

//get customer by id 

const getCustomerById = async (customerId) => {
    const sql = /*sql*/` 
    SELECT
    customer_id as customerId,
    first_name as firstName,
    last_name as lastName,
    email,
    phoneNumber,
    address_1 as address1,
    address_2 as address2,
    city,
    state,
    postcode,
    country,
    status,
    created_at as createdAt,
    updated_at as updatedAt
    FROM customer
    WHERE customer_id = ?
    AND deleted_at IS NULL
    LIMIT 1 
    `;
    const [rows] = await mysqlPool.execute(sql, [customerId]);

    return rows[0]
};

const getCustomerByEmail = async (email) => {

    const sql = /*sql*/`
        SELECT
            customer_id AS customerId,
            email,
            password,
            status
        FROM customer
        WHERE email = ?
        AND deleted_at IS NULL
        LIMIT 1
    `;

    const [rows] = await mysqlPool.execute(sql, [email]);

    return rows[0];
};

const updateCustomerById = async (
    customerId,
    customerData
) => {

    const {
        firstName,
        lastName,
        phoneNumber,
        company,
        address1,
        address2,
        city,
        state,
        postcode,
        country
    } = customerData

    const sql = /*sql*/`
    UPDATE customer
    SET 
        first_name =?,
        last_name =?,
        phoneNumber =?,
        company =?,
        address_1 =?,
        address_2 =?,
        city =?,
        state =?,
        postcode =?,
        country =?
    WHERE customer_id =?
    AND deleted_at IS NULL
   `;

   const [result] = await mysqlPool.execute(sql,[
        firstName,
        lastName,
        phoneNumber || null,
        company || null,
        address1 || null,
        address2 || null,
        city || null,
        state || null,
        postcode || null,
        country || null,
        customerId
   ]);
   return result;
}

const deleteCustomerById = async (customerId) => {

    const sql = /*sql*/`
        UPDATE customer
        SET
            deleted_at = CURRENT_TIMESTAMP,
            status = 0
        WHERE customer_id = ?
        AND deleted_at IS NULL
    `;

    const [result] = await mysqlPool.execute(
        sql,
        [customerId]
    );

    return result;
};

module.exports = {
    createOneCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById,
    getCustomerByEmail
}