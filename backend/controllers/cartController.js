const cartModel = require("../models/cartModel");

const addToCart = async (req,res)=>{
    try{
        const result = await cartModel.addCartItem(
            req.user.customerId,
            req.body.productId,
            req.body.quantity ?? 1
        );

        if(result.error === "PRODUCT NOT FOUND"){
            return res.status(404).json({
                success:false,
                message: "product not found or unavailable"
            });
        }

        if(result.error === "INVALIDE QUANTITY"){
            return res.status(404).json({
                success:false,
                message: "Quantity must be positive whole number"
            });
        }

        if(result.error === "INSUFFICIENT_STOCK"){
            return res.status(404).json({
                success:false,
                message: `Only ${result.availableQuantity} item(s) are available`
            });
        }

        return res.status(201).json({
            success:true,
            message:"product added to cart",
           data:result
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Faild to add product to cart",
            error:error.message
        });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await cartModel.getCartByCustomerId(
            req.user.customerId
        );

        return res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch cart",
            error: error.message
        });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const result = await cartModel.updateCartItem(
            req.user.customerId,
            req.params.cartItemId,
            req.body.quantity
        );

        if (result.error === "INVALID_QUANTITY") {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a positive whole number"
            });
        }

        if (result.error === "ITEM_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        if (result.error === "PRODUCT_NOT_AVAILABLE") {
            return res.status(409).json({
                success: false,
                message: "Product is no longer available"
            });
        }

        if (result.error === "INSUFFICIENT_STOCK") {
            return res.status(409).json({
                success: false,
                message: `Only ${result.availableQuantity} item(s) are available`
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart updated",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update cart",
            error: error.message
        });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const result = await cartModel.removeCartItem(
            req.user.customerId,
            req.params.cartItemId
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to remove cart item",
            error: error.message
        });
    }
};

const clearCart = async (req, res) => {
    try {
        await cartModel.clearCart(req.user.customerId);

        return res.status(200).json({
            success: true,
            message: "Cart cleared"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to clear cart",
            error: error.message
        });
    }
};

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart
};
