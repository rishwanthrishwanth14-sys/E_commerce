const customerModel = require("../models/customerModel");

const {
    hashPassword,
    comparePassword,
    generateToken,
}= require("../services/authService");

// reg customer
const registerCustomer = async (req, res) => {

    try {

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
        } = req.body;

        if (!firstName) {
            return res.status(400).json({
                success: false,
                message: "First name is required"
            });
        }

        if (!lastName) {
            return res.status(400).json({
                success: false,
                message: "Last name is required"
            });
        }

        if (!email || !email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "A valid email is required"
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        const existing = await customerModel.getCustomerByEmail(email);

        if (existing) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists"
            });
        }

        const hashedPassword = await hashPassword(password);

        const result = await customerModel.createOneCustomer({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            company,
            address1,
            address2,
            city,
            state,
            postcode,
            country
        });

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            customerId: result.insertId
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to create account",
            error: error.message
        });
    }
};

// customer login 
const loginCustomer = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const customer = await customerModel.getCustomerByEmail(email);

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await comparePassword(
            password,
            customer.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if (!customer.status) {
            return res.status(403).json({
                success: false,
                message: "This account is disabled"
            });
        }


        const token = generateToken({
            customerId: customer.customerId,
            role: "customer"
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

// get own profile
const getMyProfile = async (req, res) => {

    try {

        const customer = await customerModel.getCustomerById(req.user.customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        res.status(200).json({
            success: true,
            data: customer
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

const updateMyProfile = async (req, res) => {

    try {

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
        } = req.body;

        const result = await customerModel.updateCustomerById(
            req.user.customerId,
            {
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
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

//delete own profile 

const deleteMyAccount = async (req, res) => {

    try {

        const result = await customerModel.deleteCustomerById(req.user.customerId);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete account",
            error: error.message
        });
    }
};


module.exports = {
    registerCustomer,
    loginCustomer,
    getMyProfile,
    updateMyProfile,
    deleteMyAccount,
};