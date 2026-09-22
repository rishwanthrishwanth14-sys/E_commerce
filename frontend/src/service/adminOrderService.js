import api from "./api";

export const getAdminOrders = async () => {
    const response = await api.get("/api/admin/orders");
    return response.data;
};

export const updateAdminOrderStatus = async (orderId,data) => {
    const response = await api.put( `/api/admin/order/${orderId}/status`,data);
    return response.data;
};
