import api from "./api";

export const getAdminCustomers = async () => {
    const response = await api.get("/api/admin/customers");
    return response.data;
};
