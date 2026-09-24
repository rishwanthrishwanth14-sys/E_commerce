import api from "./api";

export const getMyOrder = async()=>{
    const respons = await api.get("/api/orders");
    return respons.data;
}