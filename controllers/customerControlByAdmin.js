const customerModel = require("../models/customerModel");

// list customer admin view
const getCustomersForAdmin = async (req, res) => {

    try {

        const customers = await customerModel.getAllCustomers();
        console.log(customers)
        res.status(200).json({
            success: true,
            data: customers
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch customers",
            error: error.message
        });
    }
};

//read customer by admin
const getCustomerByIdForAdmin = async (req, res) => {

    try {

        const customer = await customerModel.getCustomerById(req.params.customerId);

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
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

module.exports = {
    getCustomersForAdmin,
    getCustomerByIdForAdmin
}