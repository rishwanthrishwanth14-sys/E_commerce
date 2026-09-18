const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// HASH PASSWORD
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};


// COMPARE PASSWORD
const comparePassword = async (
    password,
    hashedPassword
) => {
    return await bcrypt.compare(
        password,
        hashedPassword
    );
};


// GENERATE TOKEN
const generateToken = (payload) => {

    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d"
        }
    );
};


// VERIFY TOKEN
const verifyToken = (token) => {

    return jwt.verify(
        token,
        process.env.JWT_SECRET
    );
};


module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken
};