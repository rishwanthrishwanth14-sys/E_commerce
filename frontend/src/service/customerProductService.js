import api from "./api";

export const getCustomerProducts = async () => {
    const response = await api.get("/api/customer/products");
    return response.data;
};

export const getCustomerProductById = async (productId) => {
    const response = await api.get(`/api/customer/products/${productId}`);
    return response.data;
};
