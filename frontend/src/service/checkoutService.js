import api from "./api";

export const placeOrder = async (orderData) => {
    const response = await api.post(
        "/api/place/order",
        orderData
    );

    return response.data;
};
