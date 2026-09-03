const customerAddressModel = require("../models/customerAdddressModel");

const createAddress = async (req, res) => {

    try {
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
            phoneNumber
        } = req.body;

        if (!firstName || !lastName || !address1 || !city || !state || !postcode || !country) {
            return res.status(400).json({
                success: false,
                message: "All fields are require"
            });
        }

        const result = await customerAddressModel.createOneCustomerAddress({
            customerId: req.user.customerId,
            firstName,
            lastName,
            company,
            address1,
            address2,
            city,
            state,
            postcode,
            country,
            phoneNumber
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            addressId: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to add address",
            error: error.message
        });
    }
};

// get all addresses of the logged in customer
const getAllAddressesOfCustomer = async (req, res) => {
    try {
        const addresses = await customerAddressModel.getEveryAddressesOfCustomer(req.user.customerId);
        res.status(200).json({
            success: true,
            data: addresses
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch addresses",
            error: error.message
        });
    }
};

// get one of my address
const getMyAddressById = async (req, res) => {

    try {

        const address = await customerAddressModel.getAddressById(
            req.params.addressId,
            req.user.customerId
        );

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            data: address
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



//update address
const updateMyAddress = async (req, res) => {

    try {

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
            phoneNumber
        } = req.body;

        const result = await customerAddressModel.updateCustomerAddress(
            req.params.addressId,
            req.user.customerId,
            {
                firstName,
                lastName,
                company,
                address1,
                address2,
                city,
                state,
                postcode,
                country,
                phoneNumber
            }
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

//delete address
const deleteMyAddress = async (req, res) => {

    try {

        const result = await customerAddressModel.deleteAddressForCustomer(
            req.params.addressId,
            req.user.customerId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to delete address",
            error: error.message
        });
    }
};

module.exports = {
    createAddress,
    getAllAddressesOfCustomer,
    getMyAddressById,
    updateMyAddress,
    deleteMyAddress
};
