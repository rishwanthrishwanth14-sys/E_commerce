import api from "./api";

export const createProduct = async (productData) => {
    const response = await api.post(
        "/api/admin/product",
        productData
    );

    return response.data;
};

export const getProducts = async () => {
    const response = await api.get(
        "/api/admin/products"
    );

    return response.data;
};

export const getProductById = async (productId) => {
    const response = await api.get(
        `/api/admin/product/${productId}`
    );

    return response.data;
};

export const updateProduct = async (productId, productData) => {
    const response = await api.put(
        `/api/admin/product/${productId}`,
        productData
    );

    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await api.delete(
        `/api/admin/product/${productId}`
    );

    return response.data;
};