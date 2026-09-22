import api from "./api";

export const getCart = async () => {
    const response = await api.get("/api/cart");
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post("/api/cart/items", {
        productId,
        quantity
    });
    return response.data;
};

export const updateCartItem = async (cartItemId, quantity) => {
    const response = await api.put(
        `/api/cart/items/${cartItemId}`,
        { quantity }
    );
    return response.data;
};

export const removeCartItem = async (cartItemId) => {
    const response = await api.delete(
        `/api/cart/items/${cartItemId}`
    );
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete("/api/cart");
    return response.data;
};
