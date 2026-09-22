const orderModel = require("../models/orderModel");
const { getAddressById } = require("../models/customerAdddressModel");

const generateOrderNumber = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

const placeOrder = async (req, res) => {
    try {
        const customerId = req.user.customerId;
        const {
            billingAddressId,
            shippingAddressId,
            items,
            shippingAmount = 0,
            paymentMethod = "cod",
            customerComment,
            clearCart = false
        } = req.body;

        if (
            !billingAddressId ||
            !shippingAddressId ||
            !Array.isArray(items) ||
            items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Billing address, shipping address and items are required"
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

        const requestedItems = items.map((item) => ({
            productId: Number(item.productId),
            quantity: Number(item.quantity)
        }));

        if (
            requestedItems.some(
                (item) =>
                    !Number.isInteger(item.productId) ||
                    item.productId <= 0 ||
                    !Number.isInteger(item.quantity) ||
                    item.quantity <= 0
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid product or quantity"
            });
        }

        const shipping = Number(shippingAmount);

        if (!Number.isFinite(shipping) || shipping < 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid shipping amount"
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
            subtotal: 0,
            shippingAmount: shipping,
            totalAmount: shipping,
            paymentMethod,
            customerComment,
            createdBy: null
        };

        const order = await orderModel.createOneOrder(
            orderData,
            requestedItems,
            Boolean(clearCart)
        );

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            orderId: order.orderId,
            orderNumber: orderData.orderNumber
        });
    } catch (error) {
        console.error(error);

        if (
            error.message?.includes("unavailable") ||
            error.message?.includes("Insufficient stock") ||
            error.message?.includes("Invalid quantity")
        ) {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }

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
        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

const listOrdersByCustomer = async (req, res) => {
    try {
        const customerId = Number(req.params.customerId);

        if (!customerId) {
            return res.status(400).json({
                success: false,
                message: "Customer ID is required"
            });
        }

        const orders = await orderModel.getOrdersByCustomerId(customerId);

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

const listMyOrders = async (req, res) => {
    try {
        const orders = await orderModel.getOrdersByCustomerId(
            req.user.customerId
        );

        return res.status(200).json({
            success: true,
            orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const {
            orderStatus,
            shippingStatus,
            paymentStatus,
            trackingNumber
        } = req.body;

        if (!orderStatus || !shippingStatus || !paymentStatus) {
            return res.status(400).json({
                success: false,
                message: "Order, shipping and payment statuses are required"
            });
        }

        const result = await orderModel.updateOrderStatus(
            req.params.orderId,
            orderStatus,
            shippingStatus,
            paymentStatus,
            trackingNumber,
            req.user.userId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: error.message
        });
    }
};

module.exports = {
    placeOrder,
    listAllOrders,
    listOrdersByCustomer,
    listMyOrders,
    updateOrderStatus
};
