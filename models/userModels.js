const {
    mysqlPool,
} = require("../config/db");


// CREATE USER
const createOneUser = async (userData) => {

    const {
        firstname,
        lastname,
        email,
        password,
        userType,
        image,
        status,
        createdBy
    } = userData;

    const sql = /*sql*/`
        INSERT INTO user
        (
            firstname,
            lastname,
            email,
            password,
            user_type,
            image,
            status,
            created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // console.log(result);
    const [result] = await mysqlPool.execute(
        sql, [
        firstname,
        lastname,
        email,
        password,
        userType,
        image || null,
        status,
        createdBy || null
    ]);

    return result;
};


// GET ALL USERS
const getAllUsers = async () => {

    const sql = /*sql*/`
        SELECT
            user_id AS userId,
            firstname,
            lastname,
            email,
            user_type AS userType,
            image,
            status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM user
        WHERE deleted_at IS NULL
        ORDER BY user_id DESC
    `;

    const [rows] = await mysqlPool.execute(sql);

    return rows;
};


// GET USER BY ID
const getUserById = async (userId) => {

    const sql = /*sql*/`
        SELECT
            user_id AS userId,
            firstname,
            lastname,
            email,
            user_type  AS userType,
            image,
            status,
            created_at AS createdAt,
            updated_at AS updatedAt
        FROM user
        WHERE user_id = ?
        AND
        deleted_at IS NULL
        LIMIT  1
    `;

    const [rows] = 
    await mysqlPool.execute
    (
        sql, 
        [userId]
    );

    return rows[0];
};


// UPDATE USER
const updateUserById = async (
    userId, 
    userData
) => {

    const {
        firstname,
        lastname,
        email,
        userType,
        image,
        status,
        // updated_by
    } = userData;

    const sql =/*sql*/ `
        UPDATE user
        SET
            firstname = ?,
            lastname = ?,
            email = ?,
            user_type = ?,
            image = ?,
            status = ?
            -- updated_by = ?
        WHERE user_id = ?
        AND deleted_at IS NULL
    `;
    
    const [result] = await mysqlPool.execute(sql, [
        firstname,
        lastname,
        email,
        userType,
        image || null,
        status,
        // updated_by,
        userId
    ]);
    console.log(result)

    return result;
};


// DELETE USER - SOFT DELETE
const deleteUserByUserId = async (
    userId, 
     deletedBy
) => {

    const sql = /*sql*/`
        UPDATE user
        SET
            deleted_at = CURRENT_TIMESTAMP,
            deleted_by =?,
            status = 0
        WHERE user_id = ?
        AND deleted_at IS NULL
    `;
   
    const [result] = 
    await mysqlPool.execute(
     sql, 
        [
        deletedBy ?? null,
        userId
        ]
    );
     console.log(result)
    return result;
};

//user login 

const getUserCountByEmail = async (email) => {

    const sql =/*sql*/`
    SELECT
    count(*) as count
    FROM \`user\` 
    where email = ?
    and deleted_at is null 
    `
    const [rows] = await mysqlPool.execute(sql, [email])

    return rows[0];
}

const getUserByEmail = async (email) => {
    const sql = /*sql*/`
        SELECT
            user_id AS userId,
            password,
            user_type as userType
        FROM user
        WHERE email = ?
        AND deleted_at IS NULL`;
    const [rows] = await mysqlPool.execute(sql, [email])

    return rows[0];
}

module.exports = {
    createOneUser,
    getAllUsers,
    getUserById,
    deleteUserByUserId,
    updateUserById,
    getUserCountByEmail,
    getUserByEmail
};