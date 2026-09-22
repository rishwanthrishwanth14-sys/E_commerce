import api from "./api";

export const getAddresses = async()=>{
    const response = await api.get("/api/addresses");
    return response.data;
};

export const createAddress = async (addressData) => {
    const response = await api.post("/api/create/address", addressData);
    return response.data;
};

export const updateAddress = async (addressId, addressData) => {
    const response = await api.put(`/api/address/${addressId}`, addressData);
    return response.data;
};

export const deleteAddress = async (addressId) => {
    const response = await api.delete(`/api/address/${addressId}`);
    return response.data;
};