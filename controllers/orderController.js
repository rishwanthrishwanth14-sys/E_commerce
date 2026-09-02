const orderModel = require("../models/orderModel");
const {
    getAddressById
} = require("../models/customerAdddressModel");

const generateOrderNumber = () => {
    return "ORD-" + Date.now();
};

const placeOrder = async (req, res) => {
    try {
        const customerId = req.user.customerId;
        const {
            billingAddressId,
            shippingAddressId,
            items,
            subtotal,
            shippingAmount,
            totalAmount,
            paymentMethod,
            customerComment
        } = req.body;

        if (!billingAddressId || !shippingAddressId || !items?.length) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const [billingAddress, shippingAddress] = await Promise.all([
            getAddressById(billingAddressId, customerId),
            getAddressById(shippingAddressId, customerId)
        ]);

        if (!billingAddress || !shippingAddress) {
            return res.status(404).json({
                success: false,
                message: "Billing or shipping address not found"
            });
        }

        const orderData = {
            orderNumber: generateOrderNumber(),
            customerId,

            billingFirstName: billingAddress.firstName,
            billingLastName: billingAddress.lastName,
            billingCompany: billingAddress.company,
            billingAddress1: billingAddress.address1,
            billingAddress2: billingAddress.address2,
            billingCity: billingAddress.city,
            billingState: billingAddress.state,
            billingPostcode: billingAddress.postcode,
            billingCountry: billingAddress.country,
            billingPhoneNumber: billingAddress.phoneNumber,

            shippingFirstName: shippingAddress.firstName,
            shippingLastName: shippingAddress.lastName,
            shippingCompany: shippingAddress.company,
            shippingAddress1: shippingAddress.address1,
            shippingAddress2: shippingAddress.address2,
            shippingCity: shippingAddress.city,
            shippingState: shippingAddress.state,
            shippingPostCode: shippingAddress.postcode,
            shippingCountry: shippingAddress.country,
            shippingPhoneNumber: shippingAddress.phoneNumber,

            subtotal,
            shippingAmount,
            totalAmount,
            paymentMethod,
            customerComment,
            createdBy: customerId
        };

        const order = await orderModel.createOneOrder(
            orderData,
            items.map((item) => ({
                ...item,
                total: item.total ?? Number(item.price) * Number(item.quantity)
            }))
        );

        res.status(201).json({
            success: true,
            message: "order placed",
            orderId: order.orderId,
            orderNumber: orderData.orderNumber
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to place order",
            error: error.message
        });
    }
};

const listAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.getAllOrders();
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

const listOrdersByCustomer = async (req, res) => {
    try {
        // customers may only ever view their own orders; admins (isUser tokens)
        // may look up any customer via the :customerId param
        const customerId = req.user.isUser
            ? req.params.customerId
            : req.user.customerId;

        const orders = await orderModel.getOrdersByCustomerId(customerId);
        res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

module.exports = {
    placeOrder,
    listAllOrders,
    listOrdersByCustomer
};
